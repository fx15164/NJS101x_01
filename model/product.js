const path = require('path');
const fs = require('fs');

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        const p = path.join(__dirname, '../data/product.json');
        fs.readFile(p, (err, content) => {
                const products = [];
                if(!err)
                    products = JSON.parse(content);
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => console.log(err))
            }
        )
    }

    static fetchAll() {
        fs.readFile(
            path.join(__dirname, '../data/product.json'),
            (err, content) => {
                if(err)
                    return [];
                else 
                    return JSON.parse(content);
            }
        )
    }
}