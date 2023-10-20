const mongoose = require("mongoose");

exports.UserModels = mongoose.model("User",new mongoose.Schema({
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: {type: String, unique: true },
    password: { type: String },
}))

