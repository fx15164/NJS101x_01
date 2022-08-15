const path = require('path');
const express = require('express');
const router = express.Router();

const products = require('./admin').products;

router.get('/', (req, res) => {
    console.log(products);
    res.render('shop');
});

module.exports = router;