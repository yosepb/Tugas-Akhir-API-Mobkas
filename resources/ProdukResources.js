const express = require("express");
const mongoose = require("mongoose");
const { ProdukModels } = require("../models/ProdukModels");
const multer = require("multer");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));

// Set up the multer storage and file size limits
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where you want to save the uploaded files
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for each uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // Set the file size limit to 50MB
  },
});

// tambah data produk
// app.post("/", [IsAuthenticated], async (req, res) => {
app.post("/", upload.array("images", 3), async (req, res) => {
  try {
    const newProduk = await ProdukModels.create(req.body);
    return res.status(201).json(newProduk);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// ambil semua data produk
app.get("/", async (req, res) => {
  try {
    const products = await ProdukModels.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// ambil satu data produk berdasarkan id
app.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: "404 resource not found" });
    }
    const product = await ProdukModels.findById(req.params.id).lean();
    if (!product) {
      return res.status(404).json({ error: "404 resource not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// edit data produk berdasarkan id
app.put("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: "404 resource not found" });
    }
    const updatedProduct = await ProdukModels.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).lean();
    if (!updatedProduct) {
      return res.status(404).json({ error: "Resource not found" });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// hapus data produk berdasarkan id
app.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: "404 resource not found" });
    }
    await ProdukModels.findByIdAndRemove(req.params.id);
    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = app;
