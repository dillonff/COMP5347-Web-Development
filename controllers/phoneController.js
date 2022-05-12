const phones = require('../models/phones');
const cartItem = require('../models/cartItem');

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

module.exports.getPhoneByTitle = function (req, res) {
    let title = req.query.title;
    phones.getPhoneByTitle(title, function (err, result) {
        if (err) {
            console.log('can not find the phone');
        }
        else {
            res.json(result);
        }
    });
}

//not use
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

module.exports.insertItem = function (req, res) {
    let userId = req.session.user._id;
    let phoneId = req.body.phoneId;
    let quantity = req.body.quantity;

    cartItem.getCartItemByUserIdAndPhoneId(userId, phoneId, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            if(!result) {
                phones.getPhoneById(phoneId, function (err, phone) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        let item = new cartItem({
                            quantity: quantity,
                            uid: userId,
                            phoneId: phoneId,
                            img_url: '/images/' + phone.brand + '.jpeg',
                            brand: phone.brand,
                            price: phone.price,
                            title: phone.title
                        });

                        item.save(function (err, res) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                });
            }
            else {
                cartItem.updateQuantity(userId, phoneId, quantity, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        }
    });
};

module.exports.getCartItemByUserIdAndPhoneId = function (req, res) {
    let userId;
    let phoneId = req.query.phoneId;

    if (req.session.user) {
        userId = req.session.user._id;
    }
    else {
        userId = '0';
    }

    cartItem.getCartItemByUserIdAndPhoneId(userId, phoneId, function (err, result) {
        if (err) {
            res.json();
        }
        else {
            res.json(result);
        }
    });
};

module.exports.insertReview = function (req, res) {
    let phoneId = req.body.phoneId;
    let userId = req.session.user._id;
    let rating = req.body.rating;
    let comment = req.body.comment;

    phones.insertReview(phoneId, userId, rating, comment, function (err, result) {
        if (err) {
            console.log(err);
        }
    });
};