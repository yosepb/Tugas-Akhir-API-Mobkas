const mongoose = require("mongoose");

exports.StatusModels = mongoose.model(
    "Status",
    new mongoose.Schema({
        tanggal: { type: Date, default: new Date() },
        Customer: {
            _id: false,
            nama: { type: String, default:"" },
            ktp: { type: String, default:"", trim:true },
            hp: { type: String, default:"" },
            alamat: { type: String, default:"" }
        },
        harga: { type: Number, default:0 },
        status: { type: String, default:"tersedia"},
        details: [{
            _id: false,
            nama: { type: String, default:"", required: true },
            kilometer: { type: Number, default:0, required: true },
            tahun: { type: Number, default:0, required: true },
            transisi: { type: String, default:"manual", required: true},
            plat_nomor: { type: String, default:"", maxLength:10 },
            bahan_bakar: { type: String, default:"Bensin" },
            stnk: { type: String, default:"" }
        }],
        user: { type: String, default:"" }       
    })
)