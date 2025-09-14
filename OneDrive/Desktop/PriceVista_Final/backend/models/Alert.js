const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    targetPrice: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    lastNotifiedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Alert", alertSchema);
