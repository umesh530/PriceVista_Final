// backend/scripts/seedProducts.js
require('dotenv').config();
const connectDB = require('../config/db');
const { enrichProductFromSource } = require('../services/enrichService');
const fs = require('fs');

const run = async () => {
  await connectDB();
  const raw = fs.readFileSync('./seed.json', 'utf8');
  const { urls } = JSON.parse(raw);
  for (const u of urls) {
    try {
      const p = await enrichProductFromSource(u);
      console.log('Seeded:', p._id, p.title);
    } catch (e) {
      console.error('Error seeding', u, e.message);
    }
  }
  process.exit(0);
};

run();
