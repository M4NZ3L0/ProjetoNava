const jwt = require("jsonwebtoken");
const Usuarios = require("../models/usuarios.js");
Usuarios.sync();
const bcrypt = require("bcrypt");

const direcionarParaUsuarios = async (req, res) => {
  const { token } = req.cookies;
  const decode = jwt.decode(token);

  try {
    const usuarios = await Usuarios.findAll();
    res.render("pages/usuarios/usuarios", { title: "Gerenciar Usuários", css: "./css/usuarios.css", usuarios, usuario: decode.nome });
  }
  catch (e) {
    res.status(500).send(e);
  }
}


const direcionarParaCriarUsuario = async (req, res) => {
  const { token } = req.cookies;
  const decode = jwt.decode(token);

  res.render("pages/usuarios/criarUsuario", { title: "Criar Novo Usuario", css: "./css/criarUsuario.css", usuario: decode.nome });
}


const direcionarParaAtualizarUsuario = async (req, res) => {
  const { token } = req.cookies;
  const decode = jwt.decode(token);

  const { id } = req.params;
  res.render("pages/usuarios/atualizarUsuario", { title: "Atualizar Usuario", css: "./css/atualizarUsuario.css", id, usuario: decode.nome });
}

const criarUsuario = async (req, res) => {

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
    res.status(201).redirect("/usuarios");

  } catch (error) {
    res.status(500).json({ msg: error });
  }
}

const atualizarUsuario = async (req, res) => {

  const { id } = req.params;

  if (!id) {
    res.json("O ID é necessário para verificação");
  }

  const usuario = await Usuarios.findByPk(id);

  if (!usuario) {
    res.json("Usuario não encontrado!");
  }

  let { name, password, email, isAdmin } = req.body;

  if (!name) {
    name = usuario.nome;
  }

  if (!email) {
    email = usuario.email;
  }

  let passwordHash;

  if (!password) {
    passwordHash = usuario.senha;
  }
  else {
    passwordHash = await bcrypt.hash(password, 10);
  }

  if (!isAdmin) {
    isAdmin = usuario.isAdmin;
  }

  try {

    usuario.nome = name;
    usuario.email = email;
    usuario.senha = passwordHash;
    usuario.isAdmin = isAdmin;

    await usuario.save();
    res.redirect("/usuarios");
  }
  catch (e) {
    res.json(e);
  }

}

const deletarUsuario = async (req, res) => {
  const { id } = req.params;

  const user = await Usuarios.findByPk(id);

  if (!user) {
    console.log("User don't exist");
    res.redirect("/usuarios");
  }

  await user.destroy();
  res.redirect("/usuarios");

}
module.exports = {
  direcionarParaUsuarios,
  direcionarParaCriarUsuario,
  direcionarParaAtualizarUsuario,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario
};
