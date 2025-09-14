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