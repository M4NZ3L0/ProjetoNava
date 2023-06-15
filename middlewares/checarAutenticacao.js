const jwt = require("jsonwebtoken");

//auth middlewares

const checkRegister = (req, res, next) => {

    const { name, email, password, confirm_password } = req.body;

    if (!name) {
        return res.status(422).json({ msg: "O nome é obrigatório!" });
    }

    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório!" });
    }

    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória!" });
    }

    if (password.length < 8) {
        return res.status(422).json({ msg: "A senha precisa conter no minimo 8 carateres!" });
    }

    if (password != confirm_password) {
        return res
            .status(422)
            .json({ msg: "A senha e a confirmação precisam ser iguais!" });
    }

    next();
}

const checkLogin = (req, res, next) => {

    const { email, password } = req.body;

    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório!" });
    }

    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória!" });
    }

    next();
}

async function checkToken(req, res, next) {

    const { token } = req.cookies;

    jwt.verify(token, process.env.SECRET, (err, data) => {
        if (err) {
            res.redirect("/auth/login");
        }
        else if (data) {
            console.log("Usuario Autorizado");
            next();
        }
    });
}

async function checkTokenIfAdmin(req, res, next) {

    const { token } = req.cookies;

    jwt.verify(token, process.env.SECRET, (err, data) => {
        if (err) {
            console.log(err);
            res.redirect("/auth/login");
        }
        else if (data.isAdmin) {
            console.log("ADM Autorizado");
            next();
        }
        else {
            res.redirect("/");
        }
    });
}

module.exports = { checkLogin, checkRegister, checkToken, checkTokenIfAdmin }
