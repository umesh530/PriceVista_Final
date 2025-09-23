const mongoose = require('mongoose');

const PricePointSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  store: { type: String } // e.g., 'Amazon'
});

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  images: [String],
  // a canonical product url for scraping/comparison
  sourceUrl: { type: String, required: true },
  source: { type: String }, // e.g., 'amazon'
  currentPrice: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  priceHistory: [PricePointSchema],
  retailer: String,
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
