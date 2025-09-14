<<<<<<< HEAD
import express from 'express';
import { searchProducts, getProduct, createProduct, syncProduct } from '../controllers/productController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();
router.get('/search', searchProducts);
router.get('/:id', getProduct);
router.post('/', authMiddleware, createProduct);
router.post('/:id/sync', authMiddleware, syncProduct);
=======
const express = require("express");
const {
  getProducts,
  searchProducts,
  getProductById,
  getImmersiveAssets,
  trackProduct,
  untrackProduct,
  getPriceHistory,
  addPricePoint,
} = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.get("/search", searchProducts);
router.get("/:id", getProductById);
router.get("/:id/immersive", getImmersiveAssets);
router.get("/:id/price-history", getPriceHistory);

router.post("/track", protect, trackProduct);
router.delete("/untrack/:id", protect, untrackProduct);

// Manage price history (admin/internal)
router.post("/:id/price-point", protect, adminOnly, addPricePoint);

module.exports = router;
>>>>>>> 39ccbccd79c45137d0fd162eb7c279fe1195db4f
