const path = require('path');
const fs = require('fs');

const getProductsPromise = cb => {
    fs.readFile(
        path.join(__dirname, '../data/product.json'),
        'utf-8',
        (err, content) => {
            if(err)
                cb([]);
            else 
                cb(JSON.parse(content));
        }
    )
}

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        getProductsPromise(products => {
            products.push(this);
            fs.writeFile(
                path.join(__dirname, '../data/product.json'), 
                JSON.stringify(products), 
                err => {
                    if (err) {
                        console.log(err);
                    }}
                )
        })
    }

    static fetchAll(cb) {
        getProductsPromise(cb);
    }
}