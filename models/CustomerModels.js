const mongoose = require("mongoose");

exports.CustomerModels = mongoose.model("Customer", new mongoose.Schema({
    nama:{type:String, default:"", required: true},
    ktp:{type:String, default:"", required: true, minLength:16, trim:true},
    hp:{type:String, default:"", required:true, trim:true},
    alamat:{type:String, default:"", required:true},
}))
