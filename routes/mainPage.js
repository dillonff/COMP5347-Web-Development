const express = require('express');
const phoneController = require('../controllers/phoneController');
const userController = require('../controllers/userController');


const router = express.Router();

router.get('/index', function(req, res, next) {
    res.render('index', {});
});
router.get('/search', function(req, res, next) {
    res.render('search.html');
});
router.get('/item', function(req, res, next) {
    res.render('item.html');
});

router.get('/search/getPhones', phoneController.getPhones);
router.get('/item/getPhoneById', phoneController.getPhoneById);
router.get('/item/getUsernameById', userController.getUsernameById);


module.exports = router;