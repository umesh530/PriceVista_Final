/**
 * priceTracker.js
 * - Iterate over products
 * - Scrape latest price
 * - Add new PricePoint to product.priceHistory if price changed
 * - Trigger alerts when price <= alert.targetPrice
 *
 * NOTE: For simplicity we log "triggered" alerts; integrate with email/push later.
 */
const Product = require('../models/Product');
const Alert = require('../models/Alert');
const { scrapeProduct } = require('./scraper');

const scanAndUpdateAllProducts = async () => {
  const products = await Product.find({});
  for (const p of products) {
    try {
      if (!p.sourceUrl) continue;
      const scraped = await scrapeProduct(p.sourceUrl);
      if (!scraped.price) continue;

      // if price changed, push to history and update currentPrice
      if (scraped.price !== p.currentPrice) {
        p.priceHistory.push({ price: scraped.price, date: new Date(), store: scraped.retailer });
        p.currentPrice = scraped.price;
      }
      p.inStock = !!scraped.inStock;
      if (scraped.images && scraped.images.length) p.images = scraped.images.slice(0, 5);
      await p.save();

      // check alerts for this product
      const alerts = await Alert.find({ product: p._id, active: true }).populate('user');
      for (const a of alerts) {
        if (p.currentPrice <= a.targetPrice && (!a.lastTriggeredAt || (new Date() - a.lastTriggeredAt) > 1000 * 60 * 60 * 24)) {
          // trigger alert (placeholder)
          console.log(`ALERT: Product ${p.title} price ${p.currentPrice} <= target ${a.targetPrice} for user ${a.user.email}`);
          a.lastTriggeredAt = new Date();
          // optionally set active = false if one-time
          await a.save();
          // TODO: send email / push notification to a.user.email
        }
      }
    } catch (err) {
      console.error(`Error tracking product ${p._id}:`, err.message);
    }
  }
};

module.exports = { scanAndUpdateAllProducts };
