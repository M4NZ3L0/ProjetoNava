const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql"
});

const testeDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão estabelecida com sucesso');
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }
};

testeDb();

module.exports = sequelize;

/* Tinha tentado desse jeito, mas acho o outro melhor
const mysql = require("mysql2");

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.getConnection((error) => {
    if (error) {
        console.log("Erro ao conectar ao MySQL");
    }
    else {
        console.log("Conexão estabelecida com o banco de dados.")
    }
});

module.exports = connection;
*/