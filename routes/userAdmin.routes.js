const {Router} = require("express");
const userAdminRoutes = require("../controllers/usuarios.js");
const Usuarios = require("../models/usuarios.js");
const { checkTokenIfAdmin } = require("../middlewares/authCheck.js");


const router = Router();

router
.get("/userAdmin",checkTokenIfAdmin, userAdminRoutes.userAdmin)
.get("/criarUsuario",checkTokenIfAdmin, userAdminRoutes.criarUsuario)
.post("/criarUsuario",checkTokenIfAdmin, userAdminRoutes.criarUsuarioPost)
.get("/atualizarUsuario/:id",checkTokenIfAdmin, userAdminRoutes.atualizarUsuario)
.post("/atualizarUsuario/:id",checkTokenIfAdmin, userAdminRoutes.atualizarUsuarioPost)
.post("/deletarUsuario/:id",checkTokenIfAdmin, async (req,res) => {
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