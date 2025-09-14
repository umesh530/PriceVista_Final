import mongoose from 'mongoose';
const { Schema } = mongoose;


const TrackedSchema = new Schema({
product: { type: Schema.Types.ObjectId, ref: 'product' },
targetPrice: { type: Number },
createdAt: { type: Date, default: Date.now }
});


const UserSchema = new Schema({
name: { type: String },
email: { type: String, unique: true, required: true, index: true },
passwordHash: { type: String, required: true },
tracked: [TrackedSchema]
}, { timestamps: true });


export default mongoose.model('user', UserSchema);