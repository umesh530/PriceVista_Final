// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', productController.getProducts); // supports q= & featured=true
router.get('/:id', productController.getProductById);
router.get('/:id/history', productController.getPriceHistory);

// Protected admin actions remain the same
router.post('/', protect, productController.createProduct);
router.put('/:id', protect, productController.updateProduct);
router.delete('/:id', protect, productController.deleteProduct);

module.exports = router;
