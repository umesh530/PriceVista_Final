// Copilot: implement efficient search + image mapping for PriceVista — follow the requirements above.

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { normalizeQuery, tokenize } = require('../utils/searchHelpers');

// GET /api/products/search?q=...&limit=24&page=1&fields=title,images,price
router.get('/products/search', async (req, res) => {
  try {
    let { q = '', limit = 24, page = 1, fields = '' } = req.query;
    limit = Math.max(1, Math.min(parseInt(limit), 100));
    page = Math.max(1, parseInt(page));
    const skip = (page - 1) * limit;
    const queryNorm = normalizeQuery(q);
    const tokens = tokenize(queryNorm);
    if (!tokens.length) return res.json({ products: [], total: 0 });

    // Build projection
    let projection = {};
    if (fields) {
      fields.split(',').forEach(f => projection[f.trim()] = 1);
    }
    // Always include _id
    projection._id = 1;

    // Prefer text index if available
    let mongoQuery;
    let sort = {};
    if (Product.schema.indexes().some(idx => idx[0] && idx[0].title === 'text')) {
      mongoQuery = { $text: { $search: tokens.join(' ') } };
      sort = { score: { $meta: 'textScore' }, rating: -1, createdAt: -1 };
      projection.score = { $meta: 'textScore' };
    } else {
      // Regex fallback: AND-like, partial, case-insensitive, limit regex length
      const regexTokens = tokens.map(t => new RegExp(t.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&').slice(0, 32), 'i'));
      mongoQuery = {
        $and: regexTokens.map(r => ({
          $or: [
            { title: r },
            { vendor: r },
            { tags: r },
            { keywords: r }
          ]
        }))
      };
      sort = { rating: -1, createdAt: -1 };
    }

    const products = await Product.find(mongoQuery, projection)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
    // Compute relevance if not using textScore
    let scored = products;
    if (!projection.score) {
      scored = products.map(p => {
        let matchCount = 0;
        tokens.forEach(t => {
          ['title', 'vendor', 'tags', 'keywords'].forEach(f => {
            if (p[f] && typeof p[f] === 'string' && p[f].toLowerCase().includes(t)) matchCount++;
            if (Array.isArray(p[f]) && p[f].some(val => val.toLowerCase().includes(t))) matchCount++;
          });
        });
        return { ...p, _score: matchCount };
      }).sort((a, b) => b._score - a._score || (b.rating || 0) - (a.rating || 0));
    }
    res.json({ products: scored, total: scored.length });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;
