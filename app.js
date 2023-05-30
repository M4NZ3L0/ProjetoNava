const express = require("express");
const app = express();
require("dotenv").config();
const mysql = require("./models/connection.js");
const mainRoutes = require("./controllers/routes/main.routes.js");

app.use(express.json());
app.use(express.static("public"));
app.use("/", mainRoutes);

module.exports = app;