const express = require("express");
const {
  getAllProducts,
  fetchProductById,
  fetchCategories,
  fetchProductsByCategory,
} = require("../controllers/productController");

const router = express.Router();

// Define your routes
router.get("/", getAllProducts); // To get all products
router.get("/:id", fetchProductById); // To get a product by ID
router.get("/categories", fetchCategories); // To fetch all categories
router.get("/category/:category", fetchProductsByCategory); // To fetch products by category

module.exports = router;
