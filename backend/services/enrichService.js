// backend/services/enrichService.js
const { scrapeProduct } = require('./scraper');
const Product = require('../models/Product');
const { URL } = require('url');

const mapHostToRetailer = (host) => {
  host = host.toLowerCase();
  if (host.includes('amazon')) return 'Amazon';
  if (host.includes('flipkart')) return 'Flipkart';
  if (host.includes('walmart')) return 'Walmart';
  if (host.includes('ebay')) return 'eBay';
  return host;
};

const enrichProductFromSource = async (productOrSourceUrl) => {
  // productOrSourceUrl can be a Product mongoose doc or a url string
  let product;
  let url;
  if (typeof productOrSourceUrl === 'string') {
    url = productOrSourceUrl;
    product = await Product.findOne({ sourceUrl: url });
  } else {
    product = productOrSourceUrl;
    url = product.sourceUrl;
  }

  if (!url) throw new Error('sourceUrl is required');

  const scraped = await scrapeProduct(url);
  const host = new URL(url).hostname;
  const retailerName = mapHostToRetailer(host);

  // images360 heuristic: prefer gallery images (>=6). Keep max 36 to feed viewer
  const gallery = (scraped.images || []).filter(Boolean);
  const images360 = gallery.length >= 6 ? gallery.slice(0, 36) : (product && product.images360 && product.images360.length ? product.images360 : gallery);

  // Update fields (only if value exists)
  product = product || new Product({ title: scraped.title || 'Unknown', sourceUrl: url });
  if (scraped.title) product.title = scraped.title;
  if (scraped.images && scraped.images.length) product.images = scraped.images;
  if (images360 && images360.length) product.images360 = images360;
  if (scraped.price) product.currentPrice = scraped.price;
  if (scraped.currency) product.currency = scraped.currency;
  if (scraped.rating) product.rating = scraped.rating;
  if (scraped.ratingCount) product.ratingCount = scraped.ratingCount;
  product.retailerName = retailerName;
  product.sourceDomain = host;
  product.inStock = scraped.inStock == null ? product.inStock : scraped.inStock;
  product.lastScrapedAt = new Date();

  // push snapshot: we create a snapshot per retailer per day
  const todayKey = new Date(); todayKey.setHours(0,0,0,0);
  let lastSnap = (product.priceSnapshots || []).slice(-1)[0];
  if (!lastSnap || (new Date(lastSnap.date).getTime() < todayKey.getTime())) {
    product.priceSnapshots = product.priceSnapshots || [];
    product.priceSnapshots.push({
      date: new Date(),
      pricePoints: [{ price: product.currentPrice, date: new Date(), store: retailerName }]
    });
  } else {
    // update existing snapshot for that store
    lastSnap.pricePoints = lastSnap.pricePoints || [];
    const existing = lastSnap.pricePoints.find(p => p.store === retailerName);
    if (existing) existing.price = product.currentPrice;
    else lastSnap.pricePoints.push({ price: product.currentPrice, date: new Date(), store: retailerName });
  }

  // also push basic priceHistory
  product.priceHistory = product.priceHistory || [];
  product.priceHistory.push({ price: product.currentPrice, date: new Date(), store: retailerName });

  await product.save();
  return product;
};

module.exports = { enrichProductFromSource, mapHostToRetailer };
