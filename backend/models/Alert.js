<<<<<<< HEAD
import mongoose from 'mongoose';
const { Schema } = mongoose;


const AlertSchema = new Schema({
user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
product: { type: Schema.Types.ObjectId, ref: 'product', required: true },
priceObserved: { type: Number },
triggered: { type: Boolean, default: false },
triggeredAt: { type: Date }
}, { timestamps: true });


export default mongoose.model('alert', AlertSchema);
=======
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
>>>>>>> 39ccbccd79c45137d0fd162eb7c279fe1195db4f
