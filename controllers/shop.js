const Product = require('../models/product');
// const Cart = require('../models/cart');
// const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
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
  Product.findById(prodId)
    .then(product => {
      console.log(product);
      res.render('shop/product-detail', {
        pageTitle: product.title,
        product: product,
        path: '/products'
      })
    })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
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
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      })
    })
    .catch(err => {
      console.log(err);
    })
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      res.redirect('/cart');
      console.log(result);
    })
  // let newQuantity;
  // req.user
  //   .getCart()
  //   .then(cart => {
  //     fetchedCart = cart;
  //     return cart.getProducts({where: { id: prodId }});
  //   })
  //   .then(products => {
  //     let product;
  //     if (products.length > 0) {
  //       product = products[0];
  //     }
  //     newQuantity = 1;
  //     if (product) {
  //       newQuantity = product.cartItem.quantity + 1;
  //       return product;
  //     }
  //     return Product.findByPk(prodId)
  //   })
  //   .then(product => {
  //     fetchedCart.addProduct(product, { through: { quantity: newQuantity}})
  //   })
  //   .then(reuslt => {
  //     res.redirect('/cart');
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
}

exports.postCartDeleteProduct = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: {id: req.body.id }})
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    }) 
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => {
      console.log(err);
    })
}

exports.getOrders = (req, res, next) => {
  req.user
  .getOrders({ include: ['products']})
  .then(orders => {
    console.log(orders);
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
  })
  .catch(err => {
    console.log(err);
  })
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return req.user
        .createOrder()
        .then(order => {
          order.addProduct(products.map(p => {
            p.orderItem = { quantity: p.cartItem.quantity }
            return p;
          }))
        })
        .catch(err => {
          console.log(err);
        })
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => {
      console.log(err);
    })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
