<<<<<<< HEAD
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export async function register(req, res, next) {
try {
const { name, email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
const existing = await User.findOne({ email });
if (existing) return res.status(409).json({ message: 'Email registered' });
const passwordHash = await bcrypt.hash(password, 10);
const user = await User.create({ name, email, passwordHash });
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
} catch (err) { next(err); }
}


export async function login(req, res, next) {
try {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(401).json({ message: 'Invalid credentials' });
const ok = await bcrypt.compare(password, user.passwordHash);
if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
} catch (err) { next(err); }
}


export async function getProfile(req, res, next) {
try {
const user = await User.findById(req.user._id).select('-passwordHash').populate('tracked.product');
res.json(user);
} catch (err) { next(err); }
}


export async function addTracked(req, res, next) {
try {
const { productId, targetPrice } = req.body;
req.user.tracked.push({ product: productId, targetPrice });
await req.user.save();
res.json({ message: 'tracked added' });
} catch (err) { next(err); }
}


export async function removeTracked(req, res, next) {
try {
const id = req.params.id;
req.user.tracked = req.user.tracked.filter(t => t._id.toString() !== id);
await req.user.save();
res.json({ message: 'removed' });
} catch (err) { next(err); }
}
=======
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Product = require("../models/Product");
const Alert = require("../models/Alert");

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// POST /api/users/register
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password });
  return res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: signToken(user._id),
  });
};

// POST /api/users/login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body || {};
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: "Invalid email or password" });

  return res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: signToken(user._id),
  });
};

// GET /api/users/profile (protected)
exports.getProfile = async (req, res) => {
  return res.json(req.user);
};

// PUT /api/users/profile (protected)
exports.updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name ?? user.name;
  if (req.body.password) user.password = req.body.password; // pre-save hook will hash
  await user.save();

  return res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: signToken(user._id),
  });
};

// GET /api/users/dashboard (protected)
exports.getDashboard = async (req, res) => {
  const userId = req.user._id;
  const [tracked, alerts] = await Promise.all([
    Product.find({ trackedBy: userId }).select("name platform price image updatedAt"),
    Alert.find({ user: userId }).populate("product", "name price image"),
  ]);
  res.json({ tracked, alerts, stats: { trackedCount: tracked.length, alertsCount: alerts.length } });
};

// POST /api/users/feedback (protected)
exports.submitFeedback = async (req, res) => {
  const { message } = req.body || {};
  if (!message) return res.status(400).json({ message: "Message is required" });
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $push: { feedbacks: { message, createdAt: new Date() } } },
    { new: true }
  );
  res.status(201).json({ ok: true, count: user.feedbacks.length });
};

// ===== Admin helpers =====

// GET /api/admin/users (admin)
exports.listUsers = async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
};

// DELETE /api/admin/user/:id (admin)
exports.deleteUser = async (req, res) => {
  const u = await User.findById(req.params.id);
  if (!u) return res.status(404).json({ message: "User not found" });
  await u.deleteOne();
  res.json({ message: "User deleted" });
};
>>>>>>> 39ccbccd79c45137d0fd162eb7c279fe1195db4f
