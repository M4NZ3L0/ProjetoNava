const { Router } = require("express");
const { direcionarParaLogin, direcionarParaRegister,
    authLogin, authRegister } = require("../controllers/autenticacao.js");
const { checkLogin, checkRegister } = require("../middlewares/checarAutenticacao.js");

const router = Router();


router.get("/login", direcionarParaLogin)
    .get("/registrar", direcionarParaRegister)
    .post("/login", checkLogin, authLogin)
    .post("/registrar", checkRegister, authRegister);

module.exports = router;