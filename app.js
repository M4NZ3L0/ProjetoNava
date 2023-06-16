const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser')

const authRoutes = require("./routes/autenticacao.routes.js");
const mainRoutes = require("./routes/index.routes.js");
const userRoutes = require("./routes/usuariosAdmin.routes.js");
const productsRoutes = require("./routes/produtosAdmin.routes.js");
const apiProdutos = require("./API/products.api.routes.js");

const app = express();
require("dotenv").config();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", mainRoutes);
app.use("/api", apiProdutos); //não utilizada, mas deixei ai para mostrar que está feita
app.use("/auth", authRoutes);
app.use("/", productsRoutes);
app.use("/", userRoutes);

module.exports = app;
