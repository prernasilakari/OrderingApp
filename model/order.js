const Sequelize = require('sequelize')
const sequelize = require('../config/mysql')
const Order = sequelize.define('order', {

id:{
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
},
price:{
    type: Sequelize.INTEGER,
    allowNull: false,

},
title:{
    type: Sequelize.STRING,
    allowNull: false,

},
paymentId:{
    type: Sequelize.INTEGER,
    allowNull: false,
}
});

module.exports=Order