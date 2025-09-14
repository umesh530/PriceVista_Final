import Product from '../models/Product.js';
import { scrapeAndUpsert } from '../services/scraper.js';


export async function searchProducts(req, res, next) {
try {
const q = req.query.q || '';
const prods = await Product.find({ title: { $regex: q, $options: 'i' } }).limit(50);
res.json(prods);
} catch (err) { next(err); }
}


export async function getProduct(req, res, next) {
try {
const p = await Product.findById(req.params.id);
if (!p) return res.status(404).json({ message: 'Not found' });
res.json(p);
} catch (err) { next(err); }
}


export async function createProduct(req, res, next) {
try {
const { title, sitePrices } = req.body;
const p = await Product.create({ title, sitePrices });
res.status(201).json(p);
} catch (err) { next(err); }
}


export async function syncProduct(req, res, next) {
try {
const id = req.params.id;
const updated = await scrapeAndUpsert(id);
res.json(updated);
} catch (err) { next(err); }
}