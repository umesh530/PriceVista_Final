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
