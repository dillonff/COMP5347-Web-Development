const express = require('express');
const router = express.Router();
const cartItems = require('../models/cartItem');
const phonesList = require('../models/phones')
const {reset} = require("./sessionController");

module.exports ={
    preview: function (req, res, next) {
        res.render('CheckoutPage.html');
    },

    load: function (req, res, next) {

        const uid = req.session.user._id;

        console.log(uid);
        cartItems.find({'uid': uid}, function (err, result){
            if (err){
                res.send(null);
            }else{
                res.send({item:result});
            }
        })
    },

    changeQuantity: function (req, res, next) {
        const uid = req.session.user._id;
        const phoneId = req.body.phoneId
        const newQuantity = req.body.quantity

        cartItems.findOneAndUpdate({uid: uid, phoneId:phoneId}, {quantity:newQuantity},function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        })
    },

    deleteItems: function (req, res, next) {

        const uid = req.session.user._id;
        const phoneId = req.body.phoneId;


        cartItems.deleteOne({'uid': uid,'phoneId':phoneId}, function (err,result) {
            if (err) {
                res.send(err);
            }else{
                res.send(result);
            }
        })
    },

    finalCheckout:async function(req, res, next){
        const checkoutItems = req.body;

        for (let currentId in checkoutItems){
            let currentQuantity = checkoutItems[currentId];
            let newStock = 0;

            await phonesList.find({_id: currentId})
                .then(result => {
                    let currentStock = result[0].stock;
                    newStock = currentStock - currentQuantity;
                })
                .catch(error => {})
            console.log(newStock);

            await phonesList.updateOne({_id: currentId},{stock:newStock})
                .then(result => {})
                .catch(error => {})
        }
        res.send({'code': 200});
    },


    emptyCart:function(req,res,next){
        const uid = req.session.user._id;
        console.log(uid);

        cartItems.deleteMany({uid:uid},function(err,result){
            if(err){
                res.send(err);
            }else{
                console.log(result);
                res.send({'code': 200});
            }
        })
    }
}