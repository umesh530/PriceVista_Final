const Product = require("../models/Product");
const Alert = require("../models/Alert");

// naive checker: if current price <= target -> "notify" via console (plug email/SMS later)
async function checkPricesAndTriggerAlerts() {
  const activeAlerts = await Alert.find({ isActive: true }).populate("product user");
  for (const alert of activeAlerts) {
    if (!alert.product) continue;
    if (alert.product.price <= alert.targetPrice) {
      console.log(
        `🔔 Price Alert for ${alert.user?.email}: "${alert.product.name}" at ₹${alert.product.price} (target ₹${alert.targetPrice})`
      );
      alert.lastNotifiedAt = new Date();
      await alert.save();
    }
  }
}

// record a price point on product
async function recordPricePoint(productId, newPrice) {
  await Product.findByIdAndUpdate(productId, {
    $set: { price: newPrice, lastCheckedAt: new Date() },
    $push: { priceHistory: { price: newPrice, date: new Date() } },
  });
}

module.exports = { checkPricesAndTriggerAlerts, recordPricePoint };
