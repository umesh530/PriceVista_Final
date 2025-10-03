// Copilot: Add keywords/tags to all products for robust search
const mongoose = require('mongoose');
const Product = require('../models/Product');
const { normalizeQuery, tokenize } = require('../utils/searchHelpers');

// Connect to your MongoDB (update URI as needed)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pricevista';

function generateKeywords(product) {
  // Combine title, vendor, retailerName, tags
  let base = [product.title, product.vendor, product.retailerName, ...(product.tags || [])].join(' ');
  let tokens = tokenize(normalizeQuery(base));
  // Add common synonyms for laptops
  if (tokens.includes('laptop')) tokens.push('notebook');
  if (tokens.includes('notebook')) tokens.push('laptop');
  // Dedupe
  return [...new Set(tokens)];
}

async function main() {
  await mongoose.connect(MONGO_URI);
  const products = await Product.find({});
  for (const p of products) {
    const tags = tokenize(normalizeQuery([p.title, p.vendor, p.retailerName].join(' ')));
    const keywords = generateKeywords(p);
    p.tags = tags;
    p.keywords = keywords;
    await p.save();
    console.log(`Updated product ${p._id}: tags=${tags.join(',')} keywords=${keywords.join(',')}`);
  }
  await mongoose.disconnect();
  console.log('Done updating products.');
}

main().catch(err => { console.error(err); process.exit(1); });
