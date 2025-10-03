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
  images: [String],
  images360: [String],
  sourceUrl: { type: String, required: true, unique: true },
  sourceDomain: { type: String },
  retailerName: { type: String },
  currentPrice: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  priceSnapshots: [PriceSnapshotSchema],
  priceHistory: [PricePointSchema],
  inStock: { type: Boolean, default: true },
  lastScrapedAt: Date,
  createdAt: { type: Date, default: Date.now },
  // --- Search fields ---
  vendor: { type: String, default: '' }, // e.g. 'HP', 'Dell', 'Apple'
  tags: { type: [String], default: [] }, // e.g. ['laptop', 'notebook', 'windows']
  keywords: { type: [String], default: [] }, // e.g. ['hp', 'laptop', 'notebook']
});

// Add a text index for search (title, vendor, tags, keywords, retailerName, description)
ProductSchema.index({
  title: 'text',
  vendor: 'text',
  tags: 'text',
  keywords: 'text',
  retailerName: 'text',
  description: 'text'
}, {
  weights: { title: 10, vendor: 8, tags: 6, keywords: 6, retailerName: 5, description: 2 },
  name: 'ProductTextIndex'
});

module.exports = mongoose.model('Product', ProductSchema);
