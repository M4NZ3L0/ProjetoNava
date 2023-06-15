const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser')

const authRoutes = require("./routes/auth.routes.js");
const mainRoutes = require("./routes/main.routes.js");
const userRoutes = require("./routes/userAdmin.routes.js");
const productsRoutes = require("./routes/produtosAdmin.routes.js")
const productsApiRoutes = require("./API/products.api.routes.js");

const app = express();
require("dotenv").config();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", mainRoutes);
app.use("/api", productsApiRoutes);
app.use("/auth", authRoutes);
app.use("/", productsRoutes);
app.use("/", userRoutes);

module.exports = app;