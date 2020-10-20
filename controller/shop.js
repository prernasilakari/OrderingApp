const Product = require('../model/product')

//To get All the Products
exports.getProduct = (req, res, next) => {
    Product.findAll().then(product => {
        res.render('shop/product', {
            prods: product
        })
    })

}

//To get the Product by its id
exports.getProductById = (req, res, next) => {
    const id = req.params.id;
    Product.findByPk(id).then(product => {
        res.render('shop/product-detail'
            , {
                prods: product
            }
        )
    }
    )

}

//To get all the Placed Orders Page of logged in user
exports.getOrders = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }
    req.user.getOrders().
        then(product => {

            res.render('shop/orders', {
                prods: product,

            })
        })

}

//To Place an Order
exports.postOrders = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }
    uid = req.session.uid;
    console.log("uid" + uid);
    pid = req.body.id;
    payId = uid + pid;
    price = req.body.price;
    title = req.body.title
    req.user.createOrder({
        paymentId: payId,
        price: price,
        title: title,

    }).then(result => {
        res.redirect('/shop/orders')
        result.setProducts(pid)
    })
        .catch(error => {
            console.log(error);
        })

}












