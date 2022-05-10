const mongoose = require('./db');

const phoneSchema = new mongoose.Schema(
    {
        title: String,
        brand: String,
        image: String,
        stock: Number,
        seller: String,
        price: Number,
        disabled: Boolean,
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
    return this.find({disabled: {$ne: true}, stock: {$ne: 0}}).exec(callback);
};

phoneSchema.statics.getFilteredPhones = function (keyWord, brand, price, callback) {
    let predicate = {disabled: {$ne: true}, stock: {$ne: 0}};
    if (keyWord !== '') {
        predicate['title'] = {$regex: keyWord, $options: '$i'};
    }
    if (brand !== 'All') {
        predicate['brand'] = brand;
    }
    if (price !== 'All') {
        predicate['price'] = {$lt: price};
    }
    console.log(predicate);
    return this.find(predicate).exec(callback);
};

phoneSchema.statics.getPhoneById = function (id, callback) {
    return this.findById(id).exec(callback);
};

phoneSchema.statics.insertReview = function (phoneId, userId, rating, comment, callback) {
    this.update(
        {_id: phoneId},
        {$push: {reviews: {reviewer: userId, rating: rating, comment: comment}}}
    ).exec(callback);
};

module.exports = mongoose.model('phones', phoneSchema, 'phones');