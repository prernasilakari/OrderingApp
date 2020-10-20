const Sequelize = require('sequelize')
const sequelize = require('../config/mysql')
const OrderItem = sequelize.define('orderitem', {

id:{
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
}

});

module.exports=OrderItem