<<<<<<< HEAD
import mongoose from 'mongoose';
const { Schema } = mongoose;


const SitePriceSchema = new Schema({
site: String,
url: String,
price: Number,
currency: { type: String, default: 'INR' },
lastCheckedAt: { type: Date }
});


const ProductSchema = new Schema({
title: { type: String, required: true, index: true },
description: String,
image: String,
sitePrices: [SitePriceSchema],
lowestPrice: Number,
lastUpdated: Date
}, { timestamps: true });


ProductSchema.pre('save', function(next) {
if (this.sitePrices && this.sitePrices.length) {
const nums = this.sitePrices.map(p => p.price).filter(v => typeof v === 'number');
if (nums.length) this.lowestPrice = Math.min(...nums);
this.lastUpdated = new Date();
}
next();
});


export default mongoose.model('product', ProductSchema);
=======
const mongoose = require("mongoose");

const pricePointSchema = new mongoose.Schema(
  {
    price: Number,
    date: { type: Date, default: Date.now },
  },
  { _id: false }
);

const immersiveSchema = new mongoose.Schema(
  {
    // e.g. array of image URLs like /products/<slug>/frame-001.jpg
    frames: [String],
    model3dUrl: String,
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: "text" },
    slug: { type: String, index: true }, // helpful for immersive assets in /public/products/<slug>
    price: { type: Number, required: true },
    priceHistory: [pricePointSchema],
    platform: { type: String, required: true }, // Amazon, Flipkart, Meesho, Blinkit
    url: { type: String, required: true },
    image: String,
    category: String,
    lastCheckedAt: Date,
    meta: Object,
    immersive: immersiveSchema,
    trackedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
>>>>>>> 39ccbccd79c45137d0fd162eb7c279fe1195db4f
