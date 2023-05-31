const Sequelize = require('sequelize');

const sequelize = new Sequelize('edu', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(() => {
    console.log('conexão confirmada')
}).catch(() => {
    console.log("deu merda ein")
});

module.exports = sequelize;