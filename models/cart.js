const fs = require('fs');
const path = require('path');

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
            })
        });
    }
  }