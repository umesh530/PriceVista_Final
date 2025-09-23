const Alert = require("../models/Alert");

// Create alert
const createAlert = async (req, res) => {
  const { product, targetPrice } = req.body;
  const alert = await Alert.create({ user: req.user._id, product, targetPrice });
  res.status(201).json(alert);
};

// Get user alerts
const getAlerts = async (req, res) => {
  const alerts = await Alert.find({ user: req.user._id }).populate("product");
  res.json(alerts);
};

module.exports = { createAlert, getAlerts };
