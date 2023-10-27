const express = require("express");
const app = express();
const { ROUTES } = require("./config/settings");

const bodyParser = require("body-parser");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(express.json());

// Middleware to enable CORS
app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173/users");
  res.setHeader("Access-Control-Allow-Origin", "*");
  // You can also use '*' to allow requests from any origin, but it's less secure:
  // res.setHeader('Access-Control-Allow-Origin', '*');

  // Other CORS headers you may need to set depending on your requirements
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Pass control to the next middleware
  next();
});

for (let router of ROUTES) {
  app.use(router.path, require(`./resources/${router.resource}`));
}

module.exports = app;
