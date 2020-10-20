const express = require('express')
const router = express.Router();
const adminController = require('../controller/admin')

router.get('/admin-product', adminController.getProduct)

router.get('/add-product', adminController.getAddProduct)

router.post('/add-product', adminController.addProduct)

router.get('/edit-product/:id', adminController.getProductById)

router.post('/edit-product/:id', adminController.updateProductById)

router.post('/delete', adminController.deleteProductById)

module.exports = router