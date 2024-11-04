// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const connectDB = require("./config/db"); // Import the connectDB function

// Initialize dotenv to load environment variables
dotenv.config();

// Create an instance of Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB(); // Call the connectDB function

// Define routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Define a simple route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the eCommerce API");
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
