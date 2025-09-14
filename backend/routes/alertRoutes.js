<<<<<<< HEAD
import express from 'express';
import { listAlerts, createAlert } from '../controllers/alertController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();
router.get('/', authMiddleware, listAlerts);
router.post('/', authMiddleware, createAlert);


export default router;
=======
const express = require("express");
const { createAlert, getUserAlerts, deleteAlert } = require("../controllers/alertController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createAlert);
router.get("/", protect, getUserAlerts);
router.delete("/:id", protect, deleteAlert);

module.exports = router;
>>>>>>> 39ccbccd79c45137d0fd162eb7c279fe1195db4f
