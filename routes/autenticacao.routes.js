const { Router } = require("express");
const { direcionarParaLogin, direcionarParaRegister,
    authLogin, authRegister } = require("../controllers/autenticacao.js");
const { checkLogin, checkRegister, RemoverToken, checkToken } = require("../middlewares/checarAutenticacao.js");

const router = Router();


router.get("/login", direcionarParaLogin)
    .get("/registrar", direcionarParaRegister)
    .post("/login", checkLogin, authLogin)
    .post("/registrar", checkRegister, authRegister)
    .get("/logout", RemoverToken);

module.exports = router;
