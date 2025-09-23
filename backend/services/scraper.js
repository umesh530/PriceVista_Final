// Mock scraper service
const axios = require("axios");

const scrapePrice = async (url) => {
  // TODO: Replace with real scraping logic
  const fakePrice = Math.floor(Math.random() * 5000) + 500;
  return fakePrice;
};

module.exports = { scrapePrice };
