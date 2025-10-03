// Copilot: Efficient product image lookup/proxy for PriceVista (Unsplash primary, Pexels fallback, server-side only)
const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const Product = require('../models/Product');
const { normalizeQuery, tokenize } = require('../utils/searchHelpers');
const router = express.Router();

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const CACHE_TTL = 60 * 60 * 24; // 24 hours
const imageCache = new NodeCache({ stdTTL: CACHE_TTL, checkperiod: 600 });

// Helper: build query candidates
function buildQueryCandidates({ title, vendor, keywords, tags, category }) {
  const norm = s => (s || '').toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
  const tokens = arr => tokenize(norm((arr||[]).join(' ')));
  let candidates = [];
  if (vendor && title) candidates.push(`${vendor} ${title}`);
  if (title && category) candidates.push(`${title} ${category}`);
  if (title) candidates.push(title);
  if (vendor) candidates.push(vendor);
  if (Array.isArray(keywords) && keywords.length) candidates.push(keywords.join(' '));
  if (Array.isArray(tags) && tags.length) candidates.push(tags.join(' '));
  if (category) candidates.push(category);
  // Shuffle tokens for more matches
  if (vendor && title) candidates.push(`${title} ${vendor}`);
  return [...new Set(candidates.map(norm).filter(Boolean))];
}

// Helper: filter for e-commerce aspect ratios
function isEcomAspect(img) {
  const r = img.width / img.height;
  return (r >= 0.9 && r <= 2.0); // landscape or square
}

// Helper: pick best image
function pickBestImage(images, tokens) {
  // Prefer images with tokens in description/alt
  for (const img of images) {
    const desc = `${img.description||''} ${img.alt_description||''}`.toLowerCase();
    if (tokens.some(t => desc.includes(t))) return { img, confidence: 'high' };
  }
  // Otherwise, first image
  return images.length ? { img: images[0], confidence: 'low' } : { img: null, confidence: 'none' };
}

// Exponential backoff retry
async function fetchWithRetry(fn, maxRetries = 2) {
  let attempt = 0;
  while (attempt <= maxRetries) {
    try { return await fn(); } catch (e) {
      if (attempt === maxRetries || (e.response && e.response.status < 500)) throw e;
      await new Promise(res => setTimeout(res, 300 * Math.pow(2, attempt)));
      attempt++;
    }
  }
}

// Main lookup route
router.get('/images/lookup', async (req, res) => {
  const { q, limit = 6 } = req.query;
  if (!q) return res.status(400).json({ error: 'Missing query' });
  const normQ = normalizeQuery(q);
  const cacheKey = `img:${normQ}:${limit}`;
  if (imageCache.has(cacheKey)) {
    return res.json({ results: imageCache.get(cacheKey), cached: true });
  }
  let unsplashResults = [], pexelsResults = [], usedSource = 'unsplash', confidence = 'low';
  let tokens = tokenize(normQ);
  // 1. Try Unsplash
  if (UNSPLASH_ACCESS_KEY) {
    try {
      const resp = await fetchWithRetry(() => axios.get('https://api.unsplash.com/search/photos', {
        params: { query: normQ, per_page: limit },
        headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` }
      }));
      if (resp.status === 429) throw new Error('Unsplash rate limit');
      unsplashResults = (resp.data.results || []).filter(img => isEcomAspect(img));
      if (!unsplashResults.length && resp.data.results) unsplashResults = resp.data.results;
      if (unsplashResults.length) {
        const { img, confidence: conf } = pickBestImage(unsplashResults, tokens);
        confidence = conf;
        if (img) {
          const result = [{
            url: img.urls.full,
            thumb: img.urls.small,
            width: img.width,
            height: img.height,
            source: 'unsplash',
            authorName: img.user && img.user.name,
            authorLink: img.user && img.user.links && img.user.links.html
          }];
          imageCache.set(cacheKey, result);
          // Persist to product if high confidence
          if (confidence === 'high') {
            const prod = await Product.findOne({ $or: [ { title: new RegExp(normQ, 'i') }, { vendor: new RegExp(normQ, 'i') } ] });
            if (prod && (!prod.images || !prod.images[0])) {
              prod.images = [img.urls.full];
              prod.imageAttribution = { source: 'unsplash', authorName: img.user && img.user.name, authorLink: img.user && img.user.links && img.user.links.html };
              await prod.save();
            }
          }
          return res.json({ results: result, cached: false });
        }
      }
    } catch (e) {
      if (e.response && e.response.status === 429 && imageCache.has(cacheKey)) {
        return res.json({ results: imageCache.get(cacheKey), cached: true });
      }
      // else try fallback
    }
  }
  // 2. Try Pexels
  if (PEXELS_API_KEY) {
    try {
      const resp = await fetchWithRetry(() => axios.get('https://api.pexels.com/v1/search', {
        params: { query: normQ, per_page: limit },
        headers: { Authorization: PEXELS_API_KEY }
      }));
      if (resp.status === 429) throw new Error('Pexels rate limit');
      pexelsResults = (resp.data.photos || []).filter(img => isEcomAspect(img));
      if (!pexelsResults.length && resp.data.photos) pexelsResults = resp.data.photos;
      if (pexelsResults.length) {
        const img = pexelsResults[0];
        const result = [{
          url: img.src.original,
          thumb: img.src.medium,
          width: img.width,
          height: img.height,
          source: 'pexels',
          authorName: img.photographer,
          authorLink: img.photographer_url
        }];
        imageCache.set(cacheKey, result);
        return res.json({ results: result, cached: false });
      }
    } catch (e) {
      if (e.response && e.response.status === 429 && imageCache.has(cacheKey)) {
        return res.json({ results: imageCache.get(cacheKey), cached: true });
      }
    }
  }
  // 3. Fallback: product.images[0] or placeholder
  const prod = await Product.findOne({ $or: [ { title: new RegExp(normQ, 'i') }, { vendor: new RegExp(normQ, 'i') } ] });
  if (prod && prod.images && prod.images[0]) {
    const result = [{ url: prod.images[0], thumb: prod.images[0], width: 800, height: 600, source: 'db', authorName: '', authorLink: '' }];
    imageCache.set(cacheKey, result);
    return res.json({ results: result, cached: false });
  }
  // Local placeholder
  const placeholder = [{ url: '/placeholder.jpg', thumb: '/placeholder.jpg', width: 800, height: 600, source: 'placeholder', authorName: '', authorLink: '' }];
  imageCache.set(cacheKey, placeholder);
  return res.json({ results: placeholder, cached: false });
});

// Admin/dev: refresh image for a product
router.post('/products/:id/fetch-image', async (req, res) => {
  const { id } = req.params;
  const prod = await Product.findById(id);
  if (!prod) return res.status(404).json({ error: 'Product not found' });
  const normQ = normalizeQuery([prod.vendor, prod.title, prod.category].join(' '));
  // Call lookup logic
  req.query.q = normQ;
  req.query.limit = 1;
  // Simulate GET /images/lookup
  req.url = '/images/lookup';
  router.handle(req, res);
});

module.exports = router;
