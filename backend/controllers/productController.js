<<<<<<< HEAD
import Product from '../models/Product.js';
import { scrapeAndUpsert } from '../services/scraper.js';


export async function searchProducts(req, res, next) {
try {
const q = req.query.q || '';
const prods = await Product.find({ title: { $regex: q, $options: 'i' } }).limit(50);
res.json(prods);
} catch (err) { next(err); }
}


export async function getProduct(req, res, next) {
try {
const p = await Product.findById(req.params.id);
if (!p) return res.status(404).json({ message: 'Not found' });
res.json(p);
} catch (err) { next(err); }
}


export async function createProduct(req, res, next) {
try {
const { title, sitePrices } = req.body;
const p = await Product.create({ title, sitePrices });
res.status(201).json(p);
} catch (err) { next(err); }
}


export async function syncProduct(req, res, next) {
try {
const id = req.params.id;
const updated = await scrapeAndUpsert(id);
res.json(updated);
} catch (err) { next(err); }
}
=======
const Product = require("../models/Product");
const { recordPricePoint } = require("../services/priceTracker");

// GET /api/products  (optional list)
exports.getProducts = async (_req, res) => {
  const products = await Product.find().sort({ updatedAt: -1 }).limit(50);
  res.json(products);
};

// GET /api/products/search?query=...
exports.searchProducts = async (req, res) => {
  const q = (req.query.query || "").trim();
  if (!q) return res.json([]);
  // basic text search on name
  const products = await Product.find({ name: { $regex: q, $options: "i" } })
    .sort({ updatedAt: -1 })
    .limit(40);
  res.json(products);
};

// GET /api/products/:id
exports.getProductById = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: "Product not found" });
  res.json(p);
};

// GET /api/products/:id/immersive
exports.getImmersiveAssets = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: "Product not found" });

  // If not set in DB, construct default frames from public path using slug
  if (!p.immersive?.frames?.length && p.slug) {
    // e.g. /products/<slug>/frame-0001.jpg ... frame-0036.jpg (your generator script)
    const frames = Array.from({ length: 36 }, (_, i) => {
      const n = String(i + 1).padStart(4, "0");
      return `/products/${p.slug}/frame-${n}.jpg`;
    });
    return res.json({ frames, model3dUrl: null });
  }
  res.json(p.immersive || { frames: [], model3dUrl: null });
};

// POST /api/products/track  (protected)
exports.trackProduct = async (req, res) => {
  const { productId } = req.body || {};
  if (!productId) return res.status(400).json({ message: "productId required" });

  const product = await Product.findByIdAndUpdate(
    productId,
    { $addToSet: { trackedBy: req.user._id } },
    { new: true }
  );
  if (!product) return res.status(404).json({ message: "Product not found" });

  res.json({ message: "Tracking enabled", productId: product._id });
};

// DELETE /api/products/untrack/:id (protected)
exports.untrackProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { $pull: { trackedBy: req.user._id } },
    { new: true }
  );
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Tracking removed", productId: product._id });
};

// GET /api/products/:id/price-history
exports.getPriceHistory = async (req, res) => {
  const p = await Product.findById(req.params.id).select("priceHistory name");
  if (!p) return res.status(404).json({ message: "Product not found" });
  res.json(p.priceHistory || []);
};

// POST /api/products/:id/price-point  (admin or internal seeding)
exports.addPricePoint = async (req, res) => {
  const { price } = req.body || {};
  if (price == null) return res.status(400).json({ message: "price required" });
  await recordPricePoint(req.params.id, price);
  res.status(201).json({ ok: true });
};
>>>>>>> 39ccbccd79c45137d0fd162eb7c279fe1195db4f
