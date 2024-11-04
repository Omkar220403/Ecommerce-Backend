// controllers/productController.js
const axios = require("axios");

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

const getAllProducts = async (req, res) => {
  try {
    const response = await api.get("/products");
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

const fetchProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await api.get(`/products/${id}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching product" });
  }
};

const fetchCategories = async (req, res) => {
  try {
    const response = await api.get("/products/categories");
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

const fetchProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const response = await api.get(`/products/category/${category}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products by category" });
  }
};

module.exports = {
  getAllProducts,
  fetchProductById,
  fetchCategories,
  fetchProductsByCategory,
};
