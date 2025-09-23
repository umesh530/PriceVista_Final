const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const alertRoutes = require("./routes/alertRoutes");
const errorHandler = require("./utils/errorHandler");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/alerts", alertRoutes);

 HEAD
// health
app.get("/", (_req, res) => res.send("PriceVista Backend Running 🚀"));

// routes
app.use("/api", require("./routes/index"));

// errors
app.use(notFound);
// Error handler 2c94dc48dd71901b9435effcd20b6814dfb1ee29
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
