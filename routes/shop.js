const path = require('path');
const express = require('express');
const router = express.Router();

const products = require('./admin').products;

router.get('/', (req, res) => {
    console.log(products);
    res.render('shop', { products: products, title: 'Shop', path: '/', hasProduct: products.length > 0 });
});

module.exports = router;