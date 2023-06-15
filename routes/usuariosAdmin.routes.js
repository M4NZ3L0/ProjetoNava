const { Router } = require("express");
const { direcionarParaUsuarios, direcionarParaCriarUsuario,
    direcionarParaAtualizarUsuario, criarUsuario, atualizarUsuario, deletarUsuario } = require("../controllers/usuarios.js");
const { checkTokenIfAdmin } = require("../middlewares/checarAutenticacao.js");

const router = Router();

router
    .get("/usuarios", checkTokenIfAdmin, direcionarParaUsuarios)
    .get("/criarUsuario", checkTokenIfAdmin, direcionarParaCriarUsuario)
    .get("/atualizarUsuario/:id", checkTokenIfAdmin, direcionarParaAtualizarUsuario)
    .post("/criarUsuario", checkTokenIfAdmin, criarUsuario)
    .post("/atualizarUsuario/:id", checkTokenIfAdmin, atualizarUsuario)
    .post("/deletarUsuario/:id", checkTokenIfAdmin, deletarUsuario);

module.exports = router;