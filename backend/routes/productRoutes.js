const express = require("express");
const { addProduct, getProducts } = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addProduct);
router.get("/", getProducts);

module.exports = router;
