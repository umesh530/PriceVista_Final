require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./utils/errorHandler');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const alertRoutes = require('./routes/alertRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/alerts', alertRoutes);

// health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// error handler (last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// OPTIONAL: start a cron job that runs priceTracker periodically
const priceTracker = require('./services/priceTracker');
const cron = require('node-cron');
// every hour: adjust as needed
cron.schedule('0 * * * *', async () => {
  console.log('Running price tracker cron job');
  try {
    await priceTracker.scanAndUpdateAllProducts();
  } catch (err) {
    console.error('Price tracker error:', err);
  }
});

// server.js
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
}));
