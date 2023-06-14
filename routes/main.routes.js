const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
    res.render("base", { title: "ProjetoNava", content: "include (./ pages / index)", css: "./css/base.css", contentVariables: null });
})

module.exports = router;