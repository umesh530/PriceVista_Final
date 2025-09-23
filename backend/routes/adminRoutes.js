// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { enrichProductFromSource } = require('../services/enrichService');
const { protect } = require('../middleware/authMiddleware');
const ensureAdmin = require('../middleware/adminMiddleware');

router.use(protect, ensureAdmin);

// POST /api/admin/seed  { urls: [ "https://...product" ] }
router.post('/seed', async (req, res, next) => {
  try {
    const { urls } = req.body;
    if (!Array.isArray(urls) || !urls.length) return res.status(400).json({ message: 'urls array required' });
    const results = [];
    for (const u of urls) {
      try {
        const p = await enrichProductFromSource(u);
        results.push({ url: u, ok: true, id: p._id });
      } catch (err) {
        results.push({ url: u, ok: false, error: err.message });
      }
    }
    res.json({ results });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
