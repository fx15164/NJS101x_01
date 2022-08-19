const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/product-list', {
        prods: rows,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res) => {
  const prodId = req.params.productId;
  Product.getProductById(
    prodId,
    product => {
      res.render('shop/product-detail', {
        pageTitle: product.title,
        product: product,
        path: '/products'
      })
    })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(([rows, fieldData]) => {
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    const data = [];
    Product.fetchAll(products => {
      for (let product of products) {
        const cartProduct = cart.products.find(p => p.id == product.id);
        if(cartProduct) {
          data.push({...product, ...cartProduct});
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: data
      });
    });
  })
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.getProductById(prodId, product => {
    Cart.addProduct(prodId, product.price)
    res.redirect('/cart');
  });
}

exports.postCartDeleteProduct = (req, res, next) => {
  Product.getProductById(req.body.id, product => {
    Cart.deleteById(product.id, product.price);
    res.redirect('/cart');
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
