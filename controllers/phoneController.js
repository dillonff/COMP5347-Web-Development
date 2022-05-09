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

