const Alert = require('../models/Alert');
const Product = require('../models/Product');

// create alert
const createAlert = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId, targetPrice } = req.body;
    if (!productId || targetPrice == null) return res.status(400).json({ message: 'productId and targetPrice required' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const alert = await Alert.create({ user: userId, product: productId, targetPrice });
    res.status(201).json(alert);
  } catch (err) {
    next(err);
  }
};

// get alerts for user
const getAlertsForUser = async (req, res, next) => {
  try {
    const alerts = await Alert.find({ user: req.user._id }).populate('product');
    res.json(alerts);
  } catch (err) {
    next(err);
  }
};

// update alert (toggle active)
const updateAlert = async (req, res, next) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) return res.status(404).json({ message: 'Alert not found' });
    if (!alert.user.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

    Object.assign(alert, req.body);
    await alert.save();
    res.json(alert);
  } catch (err) {
    next(err);
  }
};

// delete alert
const deleteAlert = async (req, res, next) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) return res.status(404).json({ message: 'Alert not found' });
    if (!alert.user.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
    await alert.remove();
    res.json({ message: 'Alert removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createAlert, getAlertsForUser, updateAlert, deleteAlert };
