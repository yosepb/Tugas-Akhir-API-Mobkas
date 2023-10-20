const express = require("express");
const { CustomerModels } = require("../models/CustomerModels");
const app = express();

app.post("/", async(req,res)=>{
    await CustomerModels.create(req.body);
    return res.status(200).json(req.body);
})

app.get("/", async(req,res)=>{
    if (req.query.nama) {
        customers = await CustomerModels.find({
            nama:{$regex: `.*${req.query.nama}.*`, $options: "i"},
        });
    } else {
        customers = await CustomerModels.find();
    }
    return res.status(200).json(customers);
});

module.exports = app;