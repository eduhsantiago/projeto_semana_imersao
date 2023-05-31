const Sequelize = require("sequelize");
const db = require("./db");

const mensagem = db.define("mensagens", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    subject: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    }
    



});
//criar tabela no banco de dados
//mensagem.sync()
module.exports = mensagem;

//mensagem.sync({alter : true});