const Sequelize = require('sequelize')

const sequelize = new Sequelize("orderingapp", "root", "root",
{
    dialect: "mysql",
    host: "localhost"
})

module.exports = sequelize