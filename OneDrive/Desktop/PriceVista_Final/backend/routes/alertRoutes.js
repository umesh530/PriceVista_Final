const express = require("express");
const { createAlert, getUserAlerts, deleteAlert } = require("../controllers/alertController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createAlert);
router.get("/", protect, getUserAlerts);
router.delete("/:id", protect, deleteAlert);

module.exports = router;
