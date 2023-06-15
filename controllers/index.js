const jwt = require("jsonwebtoken");

const direcionarParaIndex = (req, res) => {

    if (req.cookies.token) {
        res.redirect("/logado");
    }
    res.render("pages/index", { title: "ProjetoNava", css: "./css/base.css" });
}

const direcionarParaLogado = (req, res) => {

    const { token } = req.cookies;
    const decode = jwt.decode(token);

    if (decode.isAdmin == true) {
        res.render("pages/indexAdmin", { title: "ProjetoNava", css: "./css/base.css" });
    }
    else {
        res.render("pages/indexLogado", { title: "ProjetoNava", css: "./css/base.css" });
    }

}

module.exports = { direcionarParaIndex, direcionarParaLogado };