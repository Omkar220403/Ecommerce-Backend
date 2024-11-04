// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    firstName: String,
    lastName: String,
    address: String,
    aptSuiteUnit: String,
    city: String,
    province: String,
    postalCode: String,
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      title: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  orderSummary: {
    subtotal: Number,
    taxes: Number,
    shipping: Number,
    total: Number,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
