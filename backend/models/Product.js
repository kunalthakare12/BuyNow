const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    images: [{ type: String, required: true, validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Image URL must be a valid HTTP/HTTPS URL'
    }}],
    sizes: [{ type: String, required: true, trim: true }],
    colors: [{ type: String, required: true, trim: true }],
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    inventoryCount: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

// Defensive model export to avoid OverwriteModelError
module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);