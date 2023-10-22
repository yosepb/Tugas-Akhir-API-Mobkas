const mongoose = require("mongoose");

// definisikan model
exports.ProdukModels = mongoose.model(
  "Produk",
  new mongoose.Schema({
    foto: { type: String, default:"", required: true },
    nama: { type: String, default:"", required: true },
    kilometer: { type: Number, default:0, required: true },
    tahun: { type: Number, default:0, required: true },
    transisi: { type: String, default:"manual", required: true},
    plat_nomor: { type: String, default:"", maxLength:10 },
    bahan_bakar: { type: String, default:"Bensin" },
    stnk: { type: String, default:"" }
  })
);
