<<<<<<< HEAD
import cron from 'node-cron';
import Product from '../models/product.js';
import Alert from '../models/alert.js';
import { scrapeAndUpsert } from './scraper.js';


export function startTracker(schedule = process.env.CRON_SCHEDULE || '*/30 * * * *') {
console.log('Starting price tracker with schedule', schedule);
cron.schedule(schedule, async () => {
try {
const products = await Product.find({}).lean();
for (const p of products) {
try {
const updated = await scrapeAndUpsert(p._id.toString());
// check alerts for this product
const alerts = await Alert.find({ product: p._id, triggered: false }).populate('user');
for (const a of alerts) {
if (updated.lowestPrice != null && a.priceObserved != null && updated.lowestPrice <= a.priceObserved) {
// mark triggered (in a real app send email/push)
a.triggered = true;
a.triggeredAt = new Date();
await a.save();
console.log('Alert triggered for user', a.user.email, 'product', p._id);
}
}
} catch (err) { console.warn('refresh product failed', p._id); }
}
} catch (err) { console.error('price tracker failed', err); }
});
}
=======
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
>>>>>>> 39ccbccd79c45137d0fd162eb7c279fe1195db4f
