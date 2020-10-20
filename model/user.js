const Sequelize = require('sequelize')
const sequelize = require('../config/mysql')

const User = sequelize.define('user', {
id:{
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
},
username:{
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
},
email:{
    type: Sequelize.STRING,
    allowNull: false
},
password:{
    type: Sequelize.STRING,
    allowNull: false
},
roles:{
    type: Sequelize.STRING,
    allowNull: false
}
});

module.exports=User