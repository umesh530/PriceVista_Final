import express from 'express';
import { searchProducts, getProduct, createProduct, syncProduct } from '../controllers/productController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();
router.get('/search', searchProducts);
router.get('/:id', getProduct);
router.post('/', authMiddleware, createProduct);
router.post('/:id/sync', authMiddleware, syncProduct);