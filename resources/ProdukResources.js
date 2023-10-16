const express = require("express");
const mongoose = require("mongoose");
const { ProductModel } = require("../models/ProdukModels");
// const IsAuthenticated = require("../middlewares/IsAuthenticated");

const app = express();

app.post("/", async (req, res) => {
  await ProdukModels.create(req.body);
  return res.status(201).json(req.body);
});


module.exports = app;
