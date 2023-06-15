const { Router } = require("express");
const { checkToken } = require("../middlewares/authCheck");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const router = Router();

router.get("/", (req, res) => {
    res.render("pages/index", { title: "ProjetoNava", css: "./css/base.css" });
})

router.get("/logado", checkToken, (req, res) => {

    const {token} = req.cookies;
    const decode = jwt.decode(token);

    if (decode.isAdmin == true) {
        res.render("pages/homeAdmin", { title: "ProjetoNava", css: "./css/base.css" });
    }
    else {
        res.render("pages/homeLogado", { title: "ProjetoNava", css: "./css/base.css" });
    }

})

module.exports = router;