const express = require("express");
const mongoose = require("mongoose");
const { ProdukModels } = require("../models/ProdukModels");
const IsAuthenticated = require("../middleware/IsAuthenticated");

const app = express();

app.post("/", [IsAuthenticated], async (req, res) => {
  await ProdukModels.create(req.body);
  return res.status(201).json({detail:"Mobil Sudah Terinput"});
});

app.get("/", async (req,res) => {
  const products = await ProductModels.find();
  res.status(200).json({products});
});

app.get("/:id", async (req,res) =>{
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({detail: "404 resource not found"});
  }

  const products = await ProdukModels.findById(req.params.id)
  if (!products) {
    return res.status(404).json({detail: "404 resource not found"});
  }

  res.status(200).json(products);
})

app.put("/:id", async (req,res) =>{
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({detail:"404 resource not found"});
  }

  const result = await ProdukModels.findOneAndUpdate(
    {_id: req.params.id},
    {...req.body},
    {new: true}
  );

  return res.status(200).json(result);
})

app.delete("/:id", async (req,res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({detail: "404 resource not found"});
  }

  await ProdukModels.findOneAndDelete({_id: req.params.id});

  return res.status(204).json(null);
})

module.exports = app;
