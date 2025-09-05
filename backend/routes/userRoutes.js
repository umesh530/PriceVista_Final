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
