const mongoose = require("mongoose");

// definisikan model
exports.ProdukModels = mongoose.model(
  "Produk",
  new mongoose.Schema({
    foto: { type: String, default:"", required: true },
    nama: { type: String, default:"", required: true },
    kilometer: { type: Number, default:0, required: true },
    tahun: { type: Number, default:0, required: true },
    transisi: { type: String, default:"", required: true},
    plat_nomor: { type: String, default:"" },
    bahan_bakar: { type: String, default:"" },
    stnk: { type: String, default:"" },
    status: { type: String, default:"" },
  })
);
