const path = require('path');
const fs = require('fs');

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        const p = path.join(__dirname, '../data/product.json');
        fs.readFile(p, 'utf-8' ,(err, content) => {
                let products = [];
                if(!err) {
                    products = JSON.parse(content);
                }
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    if (err) {
                        console.log(err);
                    }
                })
            }
        )
    }

    static fetchAll(cb) {
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
}