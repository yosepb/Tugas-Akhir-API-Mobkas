const mongoose = require("mongoose");

// definisikan model
exports.ProdukModels = mongoose.model(
  "Produk",
  new mongoose.Schema({
    foto: {
      type: [String],
      default: ["", "", ""],
      required: true,
    },
    nama: { type: String, default: "", required: true },
    kilometer: { type: Number, default: 0, required: true },
    tahun: { type: Number, default: 0, required: true },
    transmisi: { type: String, default: "Manual", required: true },
    plat_nomor: { type: String, default: "", maxLength: 10 },
    bahan_bakar: { type: String, default: "Bensin", required: true },
    stnk: { type: String, default: "" },
    status: { type: String, default: "Tersedia", required: true },
    warna: { type: String, default: "", required: true },
    lokasi: { type: String, default: "", required: true },
    harga: { type: Number, default: 0, required: true },
  })
);
