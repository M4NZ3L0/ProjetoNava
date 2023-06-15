const Usuarios = require("../models/usuarios.js");
Usuarios.sync();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();

// auth functioins

const authRegister = async (req, res) => {

  const { name, email, password } = req.body;


  console.log(name, email, password);

  const userExists = await Usuarios.findOne({ where: { email: email } });

  if (userExists) {
    return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {

    await Usuarios.create({
      nome: name,
      email,
      senha: passwordHash
    })
    res.redirect("/");

  } catch (error) {
    res.status(500).json({ msg: error });
  }
}


const authLogin = async (req, res) => {

  const { email, password } = req.body;
  
  const usuario = await Usuarios.findOne({ where: { email } });

  if (!usuario) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  const checkPassword = await bcrypt.compare(password, usuario.senha);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida" });
  }

  const secret = process.env.SECRET;

  const token = jwt.sign(
    {
      isAdmin: usuario.isAdmin,
      nome: usuario.nome
    },
    secret,
    {
      expiresIn: "24h"
    }
  );
  res.cookie("token", token, {
    httpOnly: true,
  })
  res.status(200).redirect("/logado");


}

module.exports = { authLogin, authRegister }