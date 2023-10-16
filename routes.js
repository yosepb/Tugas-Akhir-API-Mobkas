const express = require("express");
const app = express();
const { ROUTES } = require("./config/settings");

app.use(express.json());

for (let router of ROUTES) {
  app.use(router.path, require(`./resources/${router.resource}`));
}

module.exports = app;
