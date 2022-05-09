const mongoose = require('./db');

const phoneSchema = new mongoose.Schema(
    {
        title: String,
        brand: String,
        image: String,
        stock: Number,
        seller: String,
        price: Number,
        disabled: String,
        reviews: {
            reviewer: String,
            rating: Number,
            comment: String
        }
    },
    {
        versionKey: false
    }
);

phoneSchema.statics.getPhones = function (callback) {
    return this.find().exec(callback);
};

phoneSchema.statics.getPhoneById = function (id, callback) {
    return this.findOne({_id: id}).exec(callback);
}

module.exports = mongoose.model('phones', phoneSchema, 'phones');