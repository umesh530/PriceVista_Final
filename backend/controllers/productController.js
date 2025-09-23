const Product = require('../models/Product');

// Create product (admin route optionally)
const createProduct = async (req, res, next) => {
  try {
    const { title, sourceUrl, currentPrice, images = [], description = '', source = '', retailer = '' } = req.body;
    if (!title || !sourceUrl || currentPrice == null) {
      return res.status(400).json({ message: 'title, sourceUrl and currentPrice required' });
    }
    const p = await Product.create({
      title,
      sourceUrl,
      currentPrice,
      images,
      description,
      source,
      retailer,
      priceHistory: [{ price: currentPrice, store: retailer }]
    });
    res.status(201).json(p);
  } catch (err) {
    next(err);
  }
};

// Get products list (with simple query params)
const getProducts = async (req, res, next) => {
  try {
    const { q, skip = 0, limit = 20 } = req.query;
    const filter = {};
    if (q) {
      filter.title = { $regex: q, $options: 'i' };
    }
    const products = await Product.find(filter).skip(Number(skip)).limit(Number(limit));
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// Get single product by id
const getProductById = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    res.json(p);
  } catch (err) {
    next(err);
  }
};

// update product (admin)
const updateProduct = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    Object.assign(p, req.body);
    await p.save();
    res.json(p);
  } catch (err) {
    next(err);
  }
};

// delete product (admin)
const deleteProduct = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    await p.remove();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
