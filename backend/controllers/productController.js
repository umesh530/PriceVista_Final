const Product = require("../models/Product");

// Add product
const addProduct = async (req, res) => {
  const { name, url, price } = req.body;

  const product = await Product.create({ name, url, price });
  res.status(201).json(product);
};

// Get all products
const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

module.exports = { addProduct, getProducts };
