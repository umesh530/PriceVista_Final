<<<<<<< HEAD
import jwt from 'jsonwebtoken';
import User from '../models/user.js';


export async function authMiddleware(req, res, next) {
try {
const header = req.headers.authorization || '';
const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;
if (!token) return res.status(401).json({ message: 'No token' });
const payload = jwt.verify(token, process.env.JWT_SECRET);
const user = await User.findById(payload.userId);
if (!user) return res.status(401).json({ message: 'User not found' });
req.user = user;
next();
} catch (err) {
return res.status(401).json({ message: 'Unauthorized', error: err.message });
}
}
=======
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token = null;

  if (req.headers.authorization?.startsWith("Bearer "))
    token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "User not found" });
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user?.role === "admin") return next();
  return res.status(403).json({ message: "Admin only" });
};

module.exports = { protect, adminOnly };
>>>>>>> 39ccbccd79c45137d0fd162eb7c279fe1195db4f
