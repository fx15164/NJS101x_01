const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        pageTitle: product.title,
        product: product,
        path: '/products'
      })
    })
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cart => {
      cart.getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          })
        })
    })
    .catch(err => {
      console.log(err);
    })
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({where: { id: prodId }});
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      newQuantity = 1;
      if (product) {
        newQuantity = product.cartItem.quantity + 1;
        return product;
      }
      return Product.findByPk(prodId)
    })
    .then(product => {
      fetchedCart.addProduct(product, { through: { quantity: newQuantity}})
    })
    .then(reuslt => {
      res.redirect('/cart');
    })
    .catch(err => {
      console.log(err);
    })
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
