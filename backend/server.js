<<<<<<< HEAD
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
=======
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./utils/errorHandler");

// env + db
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Vite (5173) + CRA (3000) friendly CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];
app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// health
app.get("/", (_req, res) => res.send("PriceVista Backend Running 🚀"));

// routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/alerts", require("./routes/alertRoutes"));

// errors
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
>>>>>>> 39ccbccd79c45137d0fd162eb7c279fe1195db4f
