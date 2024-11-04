const express = require("express");
const mongoose = require("mongoose"); // Import mongoose
const Order = require("../models/Orders"); // Adjust the path as needed
const router = express.Router();

// Checkout endpoint
router.post("/checkout", async (req, res) => {
  console.log("Checkout endpoint hit with body:", req.body); // Log the request body

  try {
    const { userDetails, products } = req.body;

    // Defensive checks for required fields
    if (!userDetails || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields or invalid format.",
      });
    }

    // Convert productId to ObjectId and prepare items
    const items = products.map(item => ({
      productId: new mongoose.Types.ObjectId(item.productId), // Ensure productId is valid
      quantity: item.quantity,
      price: item.price,
    }));

    // Calculate subtotal
    const subtotal = items
      .reduce((total, item) => {
        if (!item.price || !item.quantity) {
          throw new Error("Invalid product item: price or quantity missing.");
        }
        return total + item.price * item.quantity;
      }, 0)
      .toFixed(2);

    // Create a new order
    const order = new Order({
      user: userDetails,
      items: items,
      orderSummary: {
        subtotal: subtotal,
        // Add any additional summary details here
      },
    });

    // Save the order
    const savedOrder = await order.save();
    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    console.error("Error saving order: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to save order",
      error: error.message,
    });
  }
});

// Export the router
module.exports = router;
