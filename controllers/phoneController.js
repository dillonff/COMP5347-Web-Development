const phones = require('../models/phones');

module.exports.getPhones = function (req, res) {
    phones.getPhones(function (err, result) {
        if(err) {
            console.log('can not find phones');
        }
        else {
            res.json(result);
        }
    });
};

module.exports.getFilteredPhones = function (req, res) {
    let keyWord = req.query.keyWord;
    let brand = req.query.brand;
    let price = req.query.price;
    phones.getFilteredPhones(keyWord, brand, price, function (err, result) {
        if (err) {
            console.log('can not find phones');
        }
        else {
            res.json(result);
        }
    });
};

module.exports.getPhoneById = function (req, res) {
    let id = req.query.id;
    phones.getPhoneById(id, function (err, result) {
        if (err) {
            console.log('can not find the phone');
        }
        else {
            res.json(result);
        }
    });
};

module.exports.getHighRatingPhones = function (req, res) {
    phones.getPhones(function (err, result) {
        if(err) {
            console.log('can not find phones');
        }
        else {
            let phoneList = result.sort(function (a, b) {
                let avgA = 0;
                let avgB = 0;
                for (let i = 0; i < a.reviews.reviewer.length; ++i) {
                    avgA += a.reviews.rating[i];
                }
                if (a.reviews.reviewer.length !== 0) {
                    avgA /= a.reviews.reviewer.length;
                }
                for (let i = 0; i < a.reviews.reviewer.length; ++i) {
                    avgB += b.reviews.rating[i];
                }
                if (b.reviews.reviewer.length !== 0) {
                    avgB /= b.reviews.reviewer.length;
                }
                return avgA - avgB;
            }).slice(0, 5);

            console.log(phoneList);

            res.json(phoneList);
        }
    });
};

module.exports.insertReview = function (req, res) {
    //TODO
};

