const users = require('../models/users');

module.exports.getUsernameById = function (req, res) {
    let id = req.query.id;
    users.getUsernameById(id, function (err, result) {
        if (err) {
            console.log('can not find the user');
        }
        else {
            res.json(result);
        }
    });
};