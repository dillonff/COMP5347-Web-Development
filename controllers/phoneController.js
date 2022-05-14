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
};

module.exports.insertItem = function (req) {
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
                            img_url: '/public/images/' + phone.brand + '.jpeg',
                            brand: phone.brand,
                            price: phone.price,
                            title: phone.title
                        });

                        item.save(function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                });
            }
            else {
                cartItem.updateQuantity(userId, phoneId, quantity, function (err) {
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

module.exports.insertReview = function (req) {
    let phoneId = req.body.phoneId;
    let userId = req.session.user._id;
    let rating = req.body.rating;
    let comment = req.body.comment;

    phones.insertReview(phoneId, userId, rating, comment, function (err) {
        if (err) {
            console.log(err);
        }
    });
};