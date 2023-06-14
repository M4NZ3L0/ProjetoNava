const db = require("./connection.js");
const { DataTypes } = require('sequelize');


const Produtos = db.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  // Other model options go here
});

module.exports = Produtos;