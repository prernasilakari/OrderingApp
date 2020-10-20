const Product = require('../model/product')

//To get the add Product page of admin
exports.getAddProduct = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }
    res.render('admin/add-product', {

    })
}

//To add new Products 
exports.addProduct = (req, res, next) => {
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price;
    const description = req.body.description;
    req.user.createProduct({
        title: title,
        price: price,
        imgUrl: imgUrl,
        description: description

    })
        .then(result => {
            res.redirect('/admin/admin-product')
        }).catch(err => {
            console.log(err);
        });

}

//To get All the product of the logged in admin
exports.getProduct = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }
    req.user.getProducts().
        then(product => {
            res.render('admin/admin-product', {
                prods: product,

            })
        })

}

//To get the Product by its id
exports.getProductById = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }
    const id = req.params.id;
    req.user.getProducts({ where: { id: id } }).
        then(product => {
            const products = product[0]
            res.render('admin/edit-product', {
                prods: products,

            }
            )
        }
        )

}

//To delete the product by its id
exports.deleteProductById = (req, res, next) => {
    const id = req.body.id;
    Product.findByPk(id)
        .then(product => {
            return product.destroy()
        })
        .then(result => {
            res.redirect('/admin/admin-product')
        })
        .catch(err => {
            console.log(err);
        })
}

//To update the product
exports.updateProductById = (req, res, next) => {
    const id = req.params.id;
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price;
    const description = req.body.description;
    Product.findByPk(id).then(product => {

        product.title = title;
        product.price = price;
        product.imgUrl = imgUrl;
        product.description = description
        return product.save()

    }).then(result => {
        res.redirect('/admin/admin-product')


    }).catch(err => {
        console.log(err);
    });

}