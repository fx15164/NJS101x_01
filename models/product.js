const db = require('../util/database');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute('insert into products (title, imageUrl, price, description) values (?, ?, ?, ?)',
      [this.title, this.imageUrl, this.price, this.description]);
  }

  static deleteById(id) {

  }

  static fetchAll() {
    return db.execute('select * from products');
  }

  static getProductById(id, cb) {

  }
};
