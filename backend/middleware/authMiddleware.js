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