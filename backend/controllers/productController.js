// backend/controllers/productController.js
const Product = require('../models/Product');
const mongoose = require('mongoose');

// list products (with q search param or featured flag)
const getProducts = async (req, res, next) => {
  try {
    const { q, skip = 0, limit = 20, featured } = req.query;
    const skipN = Number(skip);
    const limitN = Math.min(Number(limit) || 20, 100);

    if (featured === 'true') {
      // Simple: fetch top N products by discount or rating
      // Here we choose highest rating first, then latest price drop
      const products = await Product.find({})
        .sort({ rating: -1, lastScrapedAt: -1 })
        .limit(limitN)
        .exec();
      return res.json(products);
    }

    if (q) {
      // use text index search & fallback to case-insensitive regex
      let results = await Product.find({ $text: { $search: q } }, { score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' }, rating: -1 })
        .skip(skipN)
        .limit(limitN);
      if (!results.length) {
        // fallback fuzzy regex
        const regex = new RegExp(q.split(/\s+/).join('|'), 'i');
        results = await Product.find({ $or: [{ title: regex }, { retailerName: regex }] }).limit(limitN);
      }
      return res.json(results);
    }

    // default: return recent products
    const products = await Product.find({}).skip(skipN).limit(limitN).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// get single product by id
const getProductById = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    // compute discount percentage if priceHistory has previous points
    let discount = null;
    if (p.priceHistory && p.priceHistory.length > 0) {
      const highest = Math.max(...p.priceHistory.map(x => x.price));
      if (highest && highest > p.currentPrice) {
        discount = Math.round(((highest - p.currentPrice) / highest) * 100);
      }
    }
    res.json({ product: p, discount });
  } catch (err) {
    next(err);
  }
};

// get price history aggregated for charts
const getPriceHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { days = 30 } = req.query;
    const product = await Product.findById(id).lean();
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Use priceSnapshots to compute daily average price for last `days`
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - Number(days));

    const snapshots = (product.priceSnapshots || []).filter(s => new Date(s.date) >= cutoff);

    // Build an array of { date: 'YYYY-MM-DD', avgPrice }
    const dayMap = {};
    snapshots.forEach(s => {
      const dayKey = new Date(s.date);
      dayKey.setHours(0,0,0,0);
      const key = dayKey.toISOString().slice(0,10);
      const avg = (s.pricePoints || []).reduce((acc, pp) => acc + (pp.price || 0), 0) / Math.max(1, (s.pricePoints || []).length);
      dayMap[key] = dayMap[key] || [];
      dayMap[key].push(avg);
    });

    const chartData = Object.keys(dayMap).sort().map(k => {
      const arr = dayMap[k];
      const avgOfAvgs = arr.reduce((a,b) => a+b, 0) / arr.length;
      return { date: k, avgPrice: Number(avgOfAvgs.toFixed(2)) };
    });

    // If chartData empty, fall back to priceHistory
    if (!chartData.length && product.priceHistory && product.priceHistory.length) {
      const history = product.priceHistory.sort((a,b) => new Date(a.date) - new Date(b.date)).slice(-days);
      const fallback = history.map(h => ({ date: h.date.toISOString().slice(0,10), avgPrice: h.price }));
      return res.json({ chartData: fallback });
    }

    return res.json({ chartData });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getPriceHistory,
  // keep create/update/delete methods if you already rely on them
  createProduct: async (req, res, next) => { /* same as previous implementation */ next(); },
  updateProduct: async (req, res, next) => { /* ... */ next(); },
  deleteProduct: async (req, res, next) => { /* ... */ next(); },
};
