const mongoose = require('mongoose');
const schema = mongoose.Schema;
const cart_item_schema = new schema({
    img_url: {
        type: String
    },
    brand: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    }

});

cart_item_schema.statics.getCartItemByUserIdAndPhoneId = function (userId, phoneId, callback) {
    return this.findOne({
        uid: userId,
        phoneId: phoneId
    }).exec(callback);
};

cart_item_schema.statics.updateQuantity = function (userId, phoneId, quantity, callback) {
    this.updateOne(
        {uid: userId, phoneId: phoneId},
        {$inc: {quantity: quantity}}
    ).exec(callback);
};

const cartItems = mongoose.model('cart_items', cart_item_schema, 'cart_items');

mongoose.connect('mongodb://localhost:27017/mydb', (err) => {
    if(err) {
        console.log("Connect failed!");
    }else {
        console.log("Connect successfully!");
    }
});

module.exports = cartItems
