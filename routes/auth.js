const express = require('express')
const router = express.Router();
const authController = require('../controller/auth')



router.get('/shop', (req, res) => {
    res.render('shop/shop')
})

router.get('/login', (req, res) => {
    res.render('common/login')
})

router.post('/login', authController.postLogin)


router.get('/register', (req, res) => {
    res.render('common/register')
})


router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/shop');
    });
})

router.post('/register', authController.postSignUp)

module.exports = router