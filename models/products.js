const db = require("./connection.js");
const { DataTypes } = require('sequelize');


const Produtos = db.define('Produto', {
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
  Descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  // Other model options go here
});

module.exports = Produtos;