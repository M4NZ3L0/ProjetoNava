const db = require("./connection.js");
const { DataTypes } = require('sequelize');

const Usuarios = db.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    Nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    // Other model options go here
  });
  
  module.exports = Usuarios;
  