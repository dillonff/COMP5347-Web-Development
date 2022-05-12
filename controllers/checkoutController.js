const express = require('express');
const router = express.Router();
const cartItems = require('../models/cartItem');

module.exports ={
    preview: function (req, res, next) {
        // console.log(1);
        res.render('CheckoutPage.html');
    },

    load: function (req, res, next) {
        // console.log(req)
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
        const title = req.body.title
        const newQuantity = req.body.quantity
        console.log("backend receive uid: "+ uid);
        console.log("backend receive title: "+ title);
        console.log("backend receive quantity: "+ newQuantity);

        cartItems.findOneAndUpdate({uid: uid,title:title}, {quantity:newQuantity},function (err, result) {
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
        const title = req.body.title;
        console.log("backend received: ")
        console.log(uid);
        console.log(title);


        cartItems.deleteOne({'uid': uid,'title':title}, function (err) {
            if (err) {
                res.send(err);
            }
        })
    },

}