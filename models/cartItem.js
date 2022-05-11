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
    phoneId: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    }

});

const cartItems = mongoose.model('cart_items', cart_item_schema, 'cart_items');

mongoose.connect('mongodb://localhost:27017/mydb', (err) => {
    if(err) {
        console.log("Connect failed!");
    }else {
        console.log("Connect successfully!");
    }
});

module.exports = cartItems
