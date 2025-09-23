/**
 * scraper.js
 * A lightweight scraper using axios + cheerio.
 *
 * IMPORTANT:
 * Real-world scraping of Amazon, Flipkart etc. requires careful handling:
 * - respect robots.txt and terms of service
 * - use proper headers, proxy, rate-limiting
 * - some pages require JS (use puppeteer)
 *
 * This file provides a simple pattern; adapt selectors per target site.
 */
const axios = require('axios');
const cheerio = require('cheerio');

const fetchHtml = async (url) => {
  const res = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; PriceVistaBot/1.0)'
    },
    timeout: 15000
  });
  return res.data;
};

// returns { price: Number, title: String, images: [String], inStock: Boolean, retailer: String }
const scrapeProduct = async (url) => {
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);

  // NOTE: These are example selectors — change per site
  // Example for a hypothetical site:
  let priceText = $('meta[property="product:price:amount"]').attr('content') || $('.price').first().text();
  let title = $('meta[property="og:title"]').attr('content') || $('h1').first().text();
  let images = [];
  $('img').each((i, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src');
    if (src && images.length < 5) images.push(src);
  });

  // extract numeric price from text
  const price = parseFloat((priceText || '').replace(/[^0-9\.]/g, '')) || null;

  // in-stock heuristic
  const outOfStockText = $('body').text().toLowerCase().includes('out of stock');
  const inStock = !outOfStockText;

  // retailer: infer from url or page
  const retailer = new URL(url).hostname;

  return { price, title: (title || '').trim(), images, inStock, retailer };
};

module.exports = { scrapeProduct };
