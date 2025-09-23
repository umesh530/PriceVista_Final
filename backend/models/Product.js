// backend/models/Product.js
const mongoose = require('mongoose');

const PricePointSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  store: { type: String } // e.g., 'amazon.in'
});

const PriceSnapshotSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  pricePoints: [PricePointSchema], // multiple retailers at snapshot time
});

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  description: String,
  // images: fallback images
  images: [String],
  // 360Images (array of image urls used by ImmersiveViewer)
  images360: [String],
  // canonical product url for scraping/comparison
  sourceUrl: { type: String, required: true, unique: true },
  sourceDomain: { type: String }, // domain host (amazon.in, flipkart.com)
  retailerName: { type: String }, // human-readable retailer (Amazon, Flipkart)
  currentPrice: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  priceSnapshots: [PriceSnapshotSchema], // snapshots for history charts
  // keep historical record as fallback too
  priceHistory: [PricePointSchema],
  inStock: { type: Boolean, default: true },
  lastScrapedAt: Date,
  createdAt: { type: Date, default: Date.now },
});

// Add a text index for search (title, description, retailerName)
ProductSchema.index({ title: 'text', description: 'text', retailerName: 'text' }, {
  weights: { title: 10, retailerName: 5, description: 2 },
  name: 'ProductTextIndex'
});

module.exports = mongoose.model('Product', ProductSchema);
