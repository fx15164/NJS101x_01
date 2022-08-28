const { ObjectId } = require('mongodb');
const { getDb } = require('../util/database');

const db = require('../util/database').getDb;

class User  {
    constructor(username, email, cart) {
        this.name = username;
        this.email = email;
        this.cart = cart;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    addToCard(product) {
        const updatedCart = { items: [{...product, quantity: 1}] }
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