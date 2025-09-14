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