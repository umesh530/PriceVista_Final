import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Config/db.js';
import alertRoutes from './routes/alertRoutes.js';
import productRoute from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './utils/errorHandler.js';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


// connect DB
await connectDB();


// routes
app.use('/api/alerts', alertRoutes);
app.use('/api/products', productRoute);
app.use('/api/users', userRoutes);


// health
app.get('/health', (req, res) => res.json({ status: 'ok' }));


// error handler
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));