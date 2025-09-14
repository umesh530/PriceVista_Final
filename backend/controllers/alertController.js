import Alert from '../models/alert.js';
import Product from '../models/product.js';


export async function listAlerts(req, res, next) {
try {
const alerts = await Alert.find({ user: req.user._id }).populate('product');
res.json(alerts);
} catch (err) { next(err); }
}


export async function createAlert(req, res, next) {
try {
const { productId, priceObserved } = req.body;
const product = await Product.findById(productId);
if (!product) return res.status(404).json({ message: 'Product not found' });
const a = await Alert.create({ user: req.user._id, product: productId, priceObserved });
res.status(201).json(a);
} catch (err) { next(err); }
}