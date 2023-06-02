const express = require("express");
const app = express();
require("dotenv").config();
const authRoutes = require("./controllers/routes/auth.routes.js");
const mainRoutes = require("./controllers/routes/main.routes.js");
const productsRoutes = require("./controllers/API/products.api.routes.js");

app.set("view engine","ejs");
app.set("views","views");

app.use(express.json());
app.use(express.static("public"));

app.use("/", mainRoutes);
app.use("/api", productsRoutes);
app.use("/auth", authRoutes);

module.exports = app;