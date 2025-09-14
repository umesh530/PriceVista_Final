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