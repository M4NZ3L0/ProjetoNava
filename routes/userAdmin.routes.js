const {Router} = require("express");
const userAdminRoutes = require("../controllers/usuarios.js");
const Usuarios = require("../models/usuarios.js");


const router = Router();

router
.get("/userAdmin", userAdminRoutes.userAdmin)
.get("/criarUsuario", userAdminRoutes.criarUsuario)
.post("/criarUsuario", userAdminRoutes.criarUsuarioPost)
.get("/atualizarUsuario/:id", userAdminRoutes.atualizarUsuario)
.post("/atualizarUsuario/:id", userAdminRoutes.atualizarUsuarioPost)
.post("/deletarUsuario/:id", async (req,res) => {
    const {id} = req.params;

    const user = await Usuarios.findByPk(id);

    if(!user)
    {
        console.log("User don't exist");
        res.redirect("/userAdmin");
    }

    await user.destroy();
    res.redirect("/userAdmin");


});


module.exports = router;