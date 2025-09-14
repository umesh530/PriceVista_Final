import express from 'express';
import { register, login, getProfile, addTracked, removeTracked } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getProfile);
router.post('/tracked', authMiddleware, addTracked);
router.delete('/tracked/:id', authMiddleware, removeTracked);