const express = require("express");
const { UserModels } = require("../models/UserModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const IsAuthenticated = require("../middleware/IsAuthenticated");
const app = express();

app.get("/check-token", [IsAuthenticated], async (req, res) => {
  // const token = req.body.token;
  res.status(200).json({ detail: "TES." });
});

app.post("/signup", async (req, res) => {
  const oldUser = await UserModels.findOne({ email: req.body.email });
  if (oldUser) {
    return res.status(400).json({
      detail: "Email sudah terdaftar, silahkan lakukan signin.",
    });
  }

  req.body.password = await bcrypt.hash(req.body.password, 10);

  await UserModels.create(req.body);
  return res.status(201).json({ detail: "Selamat, Pendaftaran Berhasil." });
});

app.post("/signin", async (req, res) => {
  const user = await UserModels.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ detail: "User Belum Terdaftar!" });
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isValidPassword) {
    return res.status(400).json({ detail: "Password tidak valid!" });
  }

  //JWT Token
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.TOKEN_KEY,
    { expiresIn: "12h" }
  );

  return res.status(200).json({ token });
});

module.exports = app;
