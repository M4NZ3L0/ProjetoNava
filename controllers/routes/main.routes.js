const {Router} = require("express");
const produtosAPI = require("../functions/produtosAPI.js");

const router = Router();

router.post("/", produtosAPI.criarProduto);

router.get("/", produtosAPI.getTodosProdutos);

router.get("/:id", produtosAPI.getProduto);

router.put("/:id", produtosAPI.updateProduto);

router.delete("/:id", produtosAPI.deleteProduto);

module.exports = router;