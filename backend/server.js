// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');

// connect to DB (must be before routes that use models)
const connectDB = require('./config/db');
connectDB();

// create app AFTER loading config & connecting DB
const app = express();

// middleware
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000'
}));
app.use(express.json()); // parse JSON

// routes - require after app is created (order of requires doesn't matter much,
// but ensure route modules DO NOT import server.js back — see circular note below)
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const alertRoutes = require('./routes/alertRoutes');
const adminRoutes = require('./routes/adminRoutes'); // admin routes (protected)

// mount routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/admin', adminRoutes);

// simple health-check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// centralized error handler (must be after routes)
const errorHandler = require('./utils/errorHandler');
app.use(errorHandler);

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// price tracker cron job (optional): run hourly (adjust as needed)
const priceTracker = require('./services/priceTracker');
cron.schedule('0 * * * *', async () => {
  console.log('Running price tracker job');
  try {
    await priceTracker.scanAndUpdateAllProducts();
  } catch (err) {
    console.error('Price tracker failed:', err);
  }
});
