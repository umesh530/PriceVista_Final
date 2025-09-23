// backend/services/scraper.js
const axios = require('axios');
const cheerio = require('cheerio');
const { URL } = require('url');
let puppeteer;
try { puppeteer = require('puppeteer'); } catch(e) { puppeteer = null; }

const fetchHtml = async (url) => {
  const res = await axios.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114 Safari/537.36' },
    timeout: 20000,
  });
  return res.data;
};

const parseJsonLd = (html) => {
  const $ = cheerio.load(html);
  const scripts = $('script[type="application/ld+json"]');
  for (let i = 0; i < scripts.length; i++) {
    try {
      const text = $(scripts[i]).contents().text();
      if (!text) continue;
      const json = JSON.parse(text);
      // JSON-LD may be an array or object
      if (Array.isArray(json)) {
        for (const item of json) {
          if (item['@type'] && /Product/i.test(item['@type'])) return item;
        }
      } else if (json['@type'] && /Product/i.test(json['@type'])) {
        return json;
      } else if (json.mainEntity && json.mainEntity['@type'] && /Product/i.test(json.mainEntity['@type'])) {
        return json.mainEntity;
      }
    } catch (e) { /* ignore parse errors */ }
  }
  return null;
};

const parseFallbackSelectors = (html, url) => {
  const $ = cheerio.load(html);
  const domain = new URL(url).hostname;

  const result = {
    title: null,
    price: null,
    images: [],
    rating: null,
    ratingCount: null,
    inStock: null,
    retailer: domain
  };

  // Domain-specific: Amazon (including amazon.in)
  if (domain.includes('amazon.')) {
    result.title = $('#productTitle').text().trim() || $('meta[property="og:title"]').attr('content');
    const priceText = $('#priceblock_ourprice').text() || $('#priceblock_dealprice').text() || $('.a-price .a-offscreen').first().text();
    result.price = priceText ? parseFloat(priceText.replace(/[^0-9\.]/g, '')) : null;
    // image: try data attribute or og:image
    const dataImage = $('#landingImage').attr('data-old-hires') || $('#landingImage').attr('src');
    if (dataImage) result.images.push(dataImage);
    const og = $('meta[property="og:image"]').attr('content');
    if (og && !result.images.includes(og)) result.images.push(og);
    const ratingText = $('span[data-hook="rating-out-of-text"]').text() || $('i.a-icon-star span').first().text();
    if (ratingText) {
      const m = ratingText.match(/[\d\.]+/);
      if (m) result.rating = parseFloat(m[0]);
    }
    result.inStock = !/out of stock|currently unavailable/i.test($('body').text());
    return result;
  }

  // Flipkart
  if (domain.includes('flipkart')) {
    result.title = $('span.B_NuCI').text() || $('meta[property="og:title"]').attr('content');
    const priceText = $('div._30jeq3._16Jk6d').first().text() || $('meta[itemprop="price"]').attr('content');
    result.price = priceText ? parseFloat(priceText.replace(/[^0-9\.]/g, '').replace(',', '')) : null;
    $('div.CXW8mj img, img._396cs4').each((i, el) => {
      const src = $(el).attr('src') || $(el).attr('data-src');
      if (src && !result.images.includes(src)) result.images.push(src);
    });
    const rating = $('div._3LWZlK').first().text();
    result.rating = rating ? parseFloat(rating) : null;
    result.inStock = !/out of stock|sold out|unavailable/i.test($('body').text());
    return result;
  }

  // Generic fallback
  result.title = $('meta[property="og:title"]').attr('content') || $('h1').first().text().trim();
  const priceGeneric = $('meta[property="product:price:amount"]').attr('content') || $('[class*="price"]').first().text();
  result.price = priceGeneric ? parseFloat((priceGeneric+'').replace(/[^0-9\.]/g, '')) : null;
  const ogImage = $('meta[property="og:image"]').attr('content');
  if (ogImage) result.images.push(ogImage);
  $('img').each((i, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src');
    if (src && result.images.length < 8 && !result.images.includes(src)) result.images.push(src);
  });
  result.inStock = !/out of stock|sold out|currently unavailable/i.test($('body').text());
  return result;
};

const parseFromJsonLd = (jsonLd, url) => {
  if (!jsonLd) return null;
  const item = {};
  item.title = jsonLd.name || jsonLd.headline || jsonLd.title;
  // price may be nested
  if (jsonLd.offers) {
    const offers = Array.isArray(jsonLd.offers) ? jsonLd.offers[0] : jsonLd.offers;
    if (offers && offers.price) item.price = Number(offers.price);
    if (offers && offers.priceCurrency) item.currency = offers.priceCurrency;
    if (offers && (offers.availability)) item.inStock = !/unavailable|out of stock/i.test(offers.availability);
  }
  item.images = [];
  if (jsonLd.image) {
    if (Array.isArray(jsonLd.image)) item.images = jsonLd.image;
    else item.images = [jsonLd.image];
  }
  if (jsonLd.aggregateRating) {
    item.rating = Number(jsonLd.aggregateRating.ratingValue || 0);
    item.ratingCount = Number(jsonLd.aggregateRating.reviewCount || jsonLd.aggregateRating.ratingCount || 0);
  }
  item.retailer = (new URL(url)).hostname;
  return item;
};

const scrapebyHtml = async (url) => {
  const html = await fetchHtml(url);
  const jsonLd = parseJsonLd(html);
  if (jsonLd) {
    const parsed = parseFromJsonLd(jsonLd, url);
    if (parsed && (parsed.price || parsed.images.length)) return parsed;
  }
  // fallback to heuristics
  return parseFallbackSelectors(html, url);
};

const scrapebyPuppeteer = async (url) => {
  if (!puppeteer) throw new Error('Puppeteer not installed');
  const browser = await puppeteer.launch({ args:['--no-sandbox','--disable-setuid-sandbox'] }); // in prod adjust
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
  const html = await page.content();
  await page.close();
  await browser.close();
  // attempt JSON-LD parse then fallback
  const jsonLd = parseJsonLd(html);
  if (jsonLd) {
    const parsed = parseFromJsonLd(jsonLd, url);
    if (parsed && (parsed.price || parsed.images.length)) return parsed;
  }
  return parseFallbackSelectors(html, url);
};

/**
 * Top-level: try axios-cheerio first, puppeteer only if needed or forced
 * returns { title, price, currency?, images:[], rating?, ratingCount?, inStock?, retailer }
 */
const scrapeProduct = async (url, opts = { forcePuppeteer: false }) => {
  try {
    if (opts.forcePuppeteer && puppeteer) return await scrapebyPuppeteer(url);
    // try quick fetch
    const quick = await scrapebyHtml(url);
    // if we got no price or images and puppeteer available, do puppeteer fallback
    if ((!quick.price && (!quick.images || quick.images.length === 0)) && puppeteer) {
      return await scrapebyPuppeteer(url);
    }
    return quick;
  } catch (err) {
    // fallback to puppeteer if available
    if (puppeteer) {
      try { return await scrapebyPuppeteer(url); } catch (e) { throw e; }
    }
    throw err;
  }
};

module.exports = { scrapeProduct };
