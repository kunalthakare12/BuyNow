const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true, trim: true },
    customerName: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      trim: true,
      lowercase: true,
      validate: {
        validator: function(v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Please provide a valid email address'
      }
    },
    phoneNumber: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    cityStateZip: { type: String, required: true, trim: true },
    products: [
      {
        name: { type: String, required: true, trim: true },
        variant: { type: String, trim: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
        selectedSize: { type: String, required: true, trim: true },
        selectedColor: { type: String, required: true, trim: true },
      },
    ],
    totalAmount: { type: Number, required: true, min: 0 },
    transactionStatus: {
      type: String,
      enum: ["Approved", "Declined", "Gateway Error"],
      required: true,
    },
  },
  { timestamps: true }
);

// Defensive model export to avoid OverwriteModelError
module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);