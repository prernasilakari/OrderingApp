const express = require('express')
const router = express.Router();
const shopController = require('../controller/shop')

router.get('/product', shopController.getProduct)

router.get('/product-detail/:id', shopController.getProductById)

router.get('/orders', shopController.getOrders)

router.post('/orders', shopController.postOrders)

module.exports = router