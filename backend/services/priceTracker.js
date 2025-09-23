// backend/services/priceTracker.js
const Product = require('../models/Product');
const Alert = require('../models/Alert');
const { enrichProductFromSource } = require('./enrichService');

const scanAndUpdateAllProducts = async () => {
  const products = await Product.find({});
  for (const p of products) {
    try {
      await enrichProductFromSource(p); // scrapes and updates snapshots
      // check alerts
      const alerts = await Alert.find({ product: p._id, active: true }).populate('user');
      for (const a of alerts) {
        if (p.currentPrice <= a.targetPrice && (!a.lastTriggeredAt || (Date.now() - new Date(a.lastTriggeredAt).getTime()) > 24 * 3600 * 1000)) {
          // TODO: integrate email / push
          console.log(`ALERT TRIGGERED: ${p.title} price ${p.currentPrice} <= ${a.targetPrice} for ${a.user.email}`);
          a.lastTriggeredAt = new Date();
          await a.save();
        }
      }
    } catch (err) {
      console.error(`tracker error for ${p._id}:`, err.message);
    }
  }
};

module.exports = { scanAndUpdateAllProducts };
