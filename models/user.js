const mongoose = require('mongoose')
const { Schema } = mongoose;


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true},
            quantity: { type: Number, required: true }
        }]
    }
});

userSchema.methods.addToCart = function(product) {
    const cartProdIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    })

    let newQuantity = 1;
    const updatedCartItem = [...this.cart.items];

    if (cartProdIndex >= 0) {
        newQuantity = this.cart.items[cartProdIndex].quantity + 1;
        updatedCartItem[cartProdIndex].quantity = newQuantity;
    } else {
        updatedCartItem.push({productId: product._id, quantity: newQuantity});
    }
    const updatedCart = { items: updatedCartItem };
    this.cart = updatedCart;
    return this.save();
}

module.exports = mongoose.model('User', userSchema);