const products = [];

exports.getAddProduct = (req, res, next) => {
    res.render('add-product',
        { title: 'Add Product', path: '/admin/add-product', isAddPrActive: true });
}

exports.postAddProduct = (req, res) => {
    products.push({ title: req.body.title })
    res.redirect('/');
}

exports.getProducts = (req, res) => {
    res.render('shop', {
        products: products, title: 'Shop',
        path: '/', hasProduct: products.length > 0,
        isShopActive: true
    })
};