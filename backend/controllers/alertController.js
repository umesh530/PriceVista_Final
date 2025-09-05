const Alert = require("../models/Alert");

// POST /api/alerts  (protected)
exports.createAlert = async (req, res) => {
  const { productId, targetPrice } = req.body || {};
  if (!productId || targetPrice == null) return res.status(400).json({ message: "productId & targetPrice required" });

  const alert = await Alert.create({
    user: req.user._id,
    product: productId,
    targetPrice,
    isActive: true,
  });

  res.status(201).json(alert);
};

// GET /api/alerts  (protected)
exports.getUserAlerts = async (req, res) => {
  const alerts = await Alert.find({ user: req.user._id }).populate("product", "name price image platform");
  res.json(alerts);
};

// DELETE /api/alerts/:id (protected)
exports.deleteAlert = async (req, res) => {
  const alert = await Alert.findOne({ _id: req.params.id, user: req.user._id });
  if (!alert) return res.status(404).json({ message: "Alert not found" });
  await alert.deleteOne();
  res.json({ message: "Alert removed" });
};
