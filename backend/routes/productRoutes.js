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
