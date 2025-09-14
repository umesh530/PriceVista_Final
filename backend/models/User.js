<<<<<<< HEAD
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
=======
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    feedbacks: [
      {
        message: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = function (entered) {
  return bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model("User", userSchema);
>>>>>>> 39ccbccd79c45137d0fd162eb7c279fe1195db4f
