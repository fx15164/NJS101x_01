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
        const cartProdIndex = this.cart.items.findIndex(cp => {
            console.log(cp.productId , ' ', product._id);
            return cp.productId.toString() === product._id.toString();
        })
        console.log(cartProdIndex);
        let newQuantity = 1;
        const updatedCartItem = [...this.cart.items];

        if (cartProdIndex >= 0) {
            newQuantity = this.cart.items[cartProdIndex].quantity + 1;
            updatedCartItem[cartProdIndex].quantity = newQuantity;
        } else {
            updatedCartItem.push({productId: new ObjectId(product._id), quantity: newQuantity});
        }

        const updatedCart = { items: updatedCartItem };
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