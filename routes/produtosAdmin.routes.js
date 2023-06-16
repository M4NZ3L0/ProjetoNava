const { Router } = require("express");
const { checkToken, checkTokenIfAdmin } = require("../middlewares/checarAutenticacao.js");
const { direcionarParaProdutos, direcionarParaUmProduto,
    direcionarParaAtualizarProduto, atualizarProduto, deletarProduto } = require("../controllers/produtos.js");
const router = Router();

router
    .get("/produtos", checkToken, direcionarParaProdutos)
    .get("/produtos/:id", checkToken,direcionarParaUmProduto)
    .get("/atualizarProduto/:id", checkTokenIfAdmin, direcionarParaAtualizarProduto)
    .post("/atualizarProduto/:id", checkTokenIfAdmin, atualizarProduto)
    .post("/deletarProduto/:id", checkTokenIfAdmin, deletarProduto)


module.exports = router;
