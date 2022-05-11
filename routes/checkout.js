const express = require('express');
const router = express.Router();
const cartItems = require('../models/cartItem');

var checkoutController = require('../controllers/checkoutController');
const {changeQuantity, deleteItems} = require("../controllers/checkoutController");

/* Checkout page. */
router.get('/', checkoutController.preview);

// load the shopping cart items info
router.get('/load', checkoutController.load);

// change the quantity of items
router.post('/changeQuantity', changeQuantity);

// delete items
router.post('/deleteItems', deleteItems);

module.exports = router;

