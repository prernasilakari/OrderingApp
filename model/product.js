const Sequelize = require('sequelize')
const sequelize = require('../config/mysql')
const Product = sequelize.define('product', {

id:{
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
},
title:{
    type: Sequelize.STRING,
    allowNull: false
},
imgUrl:{
    type: Sequelize.STRING,
    allowNull: false
},
price:{
    type: Sequelize.INTEGER,
    allowNull: false
},
description:{
    type: Sequelize.STRING,
    allowNull: false
}
});

module.exports=Product