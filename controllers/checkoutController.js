const express = require('express');
const router = express.Router();
const cartItems = require('../models/cartItem');

module.exports ={
    preview: function (req, res, next) {
        // console.log(1);
        res.render('CheckoutPage.html');
    },

    load: function (req, res, next) {
        console.log(req)
        const uid= req.query.uid
        cartItems.find({'uid': uid}, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                console.log("Load successfully!");
                res.send({item: result});
            }
        })
    },

    changeQuantity: function (req, res, next) {
        console.log(req)
        const uid= req.body.uid
        const brand = req.body.brand
        const newQuantity = req.body.quantity
        console.log(uid);
        console.log(brand);
        console.log(newQuantity);

        cartItems.findOneAndUpdate({'uid': uid,'brand':brand}, {'quantity':newQuantity},function (err, result) {
            if (err) {
                res.send(err);
            } else {
                console.log("Change successfully!");
                console.log(result);
                res.send(result);
            }
        })
    },

    deleteItems: function (req, res, next) {
        console.log(req);
        const uid= req.body.uid;
        const brand = req.body.brand;
        console.log(uid);
        console.log(brand);


        cartItems.deleteOne({'uid': uid,'brand':brand}, function (err) {
            if (err) {
                res.send(err);
            }
        })
    },

}