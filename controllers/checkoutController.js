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

        // const user = req.session.user
        // cartItems.find({'uid': user._id}, function (err, result)

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
        const phoneId = req.body.phoneId
        const newQuantity = req.body.quantity
        console.log("backend receive uid: "+ uid);
        console.log("backend receive phoneID: "+ phoneId);
        console.log("backend receive quantity: "+ newQuantity);

        cartItems.findOneAndUpdate({uid: uid, phoneId:phoneId}, {quantity:newQuantity},function (err, result) {
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
        const phoneId = req.body.phoneId;
        console.log("backend received: ")
        console.log(uid);
        console.log(phoneId);


        cartItems.deleteOne({'uid': uid,'phoneId':phoneId}, function (err) {
            if (err) {
                res.send(err);
            }else{
                console.log("backend delete successfully!")
            }
        })
    },

    // finalCheckout: function(req, res, next){
    //     console.log(req);
    //
    // },

}