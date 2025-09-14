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