<<<<<<< HEAD
import express from 'express';
import { register, login, getProfile, addTracked, removeTracked } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getProfile);
router.post('/tracked', authMiddleware, addTracked);
router.delete('/tracked/:id', authMiddleware, removeTracked);
=======
const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  getDashboard,
  submitFeedback,
  listUsers,
  deleteUser,
} = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.get("/dashboard", protect, getDashboard);
router.post("/feedback", protect, submitFeedback);

// admin
router.get("/admin/users", protect, adminOnly, listUsers);
router.delete("/admin/user/:id", protect, adminOnly, deleteUser);

module.exports = router;
>>>>>>> 39ccbccd79c45137d0fd162eb7c279fe1195db4f
