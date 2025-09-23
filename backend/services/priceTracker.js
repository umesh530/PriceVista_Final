const Product = require("../models/Product");
const { scrapePrice } = require("./scraper");

const trackPrices = async () => {
  const products = await Product.find();
  for (let product of products) {
    const newPrice = await scrapePrice(product.url);
    product.price = newPrice;
    product.lastChecked = Date.now();
    await product.save();
  }
};

module.exports = { trackPrices };
