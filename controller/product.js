const Product = require('../model/product')

exports.getAddProduct = (req, res, next) => {
    res.render('add-product',
        { title: 'Add Product', path: '/admin/add-product', isAddPrActive: true });
}

exports.postAddProduct = (req, res) => {
     const product = new Product(req.body.title)
     product.save();
    res.redirect('/');
}

exports.getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render('shop', {
            products: products, title: 'Shop',
            path: '/', hasProduct: products.length > 0,
            isShopActive: true
        })
    });
};