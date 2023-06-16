const { Router } = require("express");
const { checkToken } = require("../middlewares/checarAutenticacao.js");
const { direcionarParaIndex, direcionarParaLogado } = require("../controllers/index.js");

const router = Router();

router.get("/", direcionarParaIndex)
    .get("/logado", checkToken, direcionarParaLogado);

module.exports = router;
