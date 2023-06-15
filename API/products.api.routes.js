const {Router} = require("express");
const produtosAPI = require("../controllers/produtosAPI.js");

const router = Router();

router.post("/produtos", produtosAPI.criarProduto);

router.get("/produtos", produtosAPI.getTodosProdutos);

router.get("/produtos/:id", produtosAPI.getProduto);

router.patch("/produtos/:id", produtosAPI.updateProduto);

router.delete("/produtos/:id", produtosAPI.deleteProduto);

module.exports = router;