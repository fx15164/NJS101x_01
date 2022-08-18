const fs = require('fs');
const path = require('path');
const Product = require('./product');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

  module.exports = class Cart {
    static addProduct(id, prodPrice) {
        fs.readFile(p, (err, content) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(content);
            }
            //
            const existingProdIdx = cart.products.findIndex(p => p.id == id);
            const existingProd = cart.products[existingProdIdx];
            let updatedProd;
            if (existingProd) {
                updatedProd = {...existingProd, qty: existingProd.qty + 1};
                cart.products[existingProdIdx] = updatedProd;
            } else {
                updatedProd = { id: id, qty: 1 }
                cart.products = [...cart.products, updatedProd];
            }
            cart.totalPrice = cart.totalPrice + prodPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }

      static deleteById(id, prodPrice) {
          fs.readFile(p, (err, content) => {
              if (err) {
                  return;
              }

              const cart = JSON.parse(content);
              const updatedCart = {...cart};

              const qty = cart.products.find(p => p.id === id).qty;

              const updatedProducts = [...cart.products.filter(p => p.id !== id)];

              updatedCart.products = updatedProducts;
              updatedCart.totalPrice -= prodPrice * qty;

              fs.writeFile(p, JSON.stringify(updatedCart), err => {
                  console.log(err);
              });
          });
      }

      static getCart(cb) {
        fs.readFile(p, (err, content) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(content);
            }
            cb(cart);
        });
      }
  }