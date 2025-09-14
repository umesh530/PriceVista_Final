<<<<<<< HEAD
import axios from 'axios';
import cheerio from 'cheerio';
import Product from '../models/product.js';


// Very basic scraper helpers. For production you should implement per-site parsers and proxies.


export async function fetchHTML(url) {
const res = await axios.get(url, { headers: { 'User-Agent': 'PriceVistaBot/1.0 (+http)' }});
return res.data;
}


export async function extractPriceFromHtml(html) {
const $ = cheerio.load(html);
// naive selectors - try common patterns
const selectors = ["[id*=price]", "[class*=price]", "meta[itemprop='price']", "span[data-price]"];
for (const sel of selectors) {
const t = $(sel).first().text() || $(sel).attr('content');
if (t) {
const num = parseFloat((t + '').replace(/[^0-9.]/g, ''));
if (Number.isFinite(num)) return num;
}
}
return null;
}


export async function scrapeUrl(url) {
try {
const html = await fetchHTML(url);
const price = await extractPriceFromHtml(html);
const $ = cheerio.load(html);
const title = $('title').text().trim();
const image = $('img').first().attr('src') || null;
return { price, title, image };
} catch (err) {
console.warn('scrapeUrl failed', err.message);
return { price: null };
}
}


export async function scrapeAndUpsert(idOrUrl) {
// if id is ObjectId -> update product's sitePrices by re-scraping saved URLs
if (typeof idOrUrl === 'string' && idOrUrl.startsWith('http')) {
// create new product with unknown site
const { price, title, image } = await scrapeUrl(idOrUrl);
const p = await Product.create({ title: title || 'Unknown', image, sitePrices: [{ site: 'unknown', url: idOrUrl, price, lastCheckedAt: new Date() }] });
return p;
}


const product = await Product.findById(idOrUrl);
if (!product) throw new Error('product not found');


for (const sp of product.sitePrices) {
try {
const { price } = await scrapeUrl(sp.url);
if (price) {
sp.price = price;
sp.lastCheckedAt = new Date();
}
} catch (err) { console.warn('site scrape failed', sp.url); }
}
await product.save();
return product;
}
=======
// Mock scraping adapters. Replace with real implementations later.
async function fetchAmazonProduct(url) {
	return { name: "Amazon Sample", price: 49999, platform: "Amazon", url, image: "/placeholder-amazon.jpg" };
  }
  async function fetchFlipkartProduct(url) {
	return { name: "Flipkart Sample", price: 48999, platform: "Flipkart", url, image: "/placeholder-flipkart.jpg" };
  }
  async function fetchMeeshoProduct(url) {
	return { name: "Meesho Sample", price: 2999, platform: "Meesho", url, image: "/placeholder-meesho.jpg" };
  }
  async function fetchBlinkitProduct(url) {
	return { name: "Blinkit Sample", price: 199, platform: "Blinkit", url, image: "/placeholder-blinkit.jpg" };
  }
  
  module.exports = {
	fetchAmazonProduct,
	fetchFlipkartProduct,
	fetchMeeshoProduct,
	fetchBlinkitProduct,
  };
  
>>>>>>> 39ccbccd79c45137d0fd162eb7c279fe1195db4f
