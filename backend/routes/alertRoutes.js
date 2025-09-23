const express = require("express");
const { createAlert, getAlerts } = require("../controllers/alertController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createAlert);
router.get("/", protect, getAlerts);

module.exports = router;
