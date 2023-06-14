const Usuarios = require("../models/usuarios.js");
const bcrypt = require("bcrypt");
Usuarios.sync();

const userAdmin = async (req, res) => {

    try {
        const usuarios = await Usuarios.findAll();
        res.render("./pages/usuarios/userAdmin", { usuarios });
    }
    catch (e) {
        res.status(500).send(e);
    }
}


const criarUsuario = async (req, res) => {

    res.render("./pages/usuarios/createUser");
}

const criarUsuarioPost = async (req, res) => {

    const { name, email, password, isAdmin } = req.body;

    const userExists = await Usuarios.findOne({ where: { email: email } });

    if (userExists) {
        return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    try {

        await Usuarios.create({
            nome: name,
            email,
            senha: passwordHash,
            isAdmin
        })
        res.status(201).redirect("/userAdmin");

    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const atualizarUsuarioPost = async (req, res) => {

    const {id} = req.params;

    if (!id) {
        res.json("O ID é necessário para verificação");
    }

    const userExists = await Usuarios.findOne({ where: { id } });

    if (!userExists) {
        res.json("Usuario não encontrado!");
    }

    const { name, password, isAdmin } = req.body;

    if (!name) {
        name = userExists.nome;
    }

    let passwordHash;

    if (!password) {
        passwordHash = userExists.senha;
    }
    else {
        passwordHash = await bcrypt.hash(password, 10);
    }

    if (!isAdmin) {
        isAdmin = userExists.isAdmin;
    }

    try {
        userExists.nome = name;
        userExists.senha = passwordHash;
        userExists.isAdmin = isAdmin;

        userExists.save();
        res.redirect("/userAdmin");
    }
    catch (e) {
        res.send(e);
    }

}

const atualizarUsuario = async (req, res) => {

    res.render("./pages/usuarios/updateUser");
}

module.exports = { userAdmin, criarUsuario, atualizarUsuario, atualizarUsuarioPost, criarUsuarioPost };