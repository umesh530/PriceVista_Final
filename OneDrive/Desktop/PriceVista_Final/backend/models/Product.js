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
