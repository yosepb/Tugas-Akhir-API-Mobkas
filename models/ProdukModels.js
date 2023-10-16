const mongoose = require("mongoose");

// definisikan model
exports.ProdukModels = mongoose.model(
  "Produk",
  new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    location: { type: String, default: "" },
  })
);
