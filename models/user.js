const { ObjectId } = require('mongodb');
const { getDb } = require('../util/database');

const db = require('../util/database').getDb;

class User  {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    addToCart(product) {
        const updatedCart = { items: [{productId: product._id, quantity: 1}] }
        const db = getDb();
        return db.collection('users')
        .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: updatedCart }}
        )
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users').find({_id: new ObjectId(userId)}).next();
    }
}

module.exports = User;