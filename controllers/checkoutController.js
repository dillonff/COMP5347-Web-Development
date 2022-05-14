const express = require('express');
const router = express.Router();
const cartItems = require('../models/cartItem');
const phonesList = require('../models/phones')
const {reset} = require("./sessionController");

module.exports ={
    preview: function (req, res, next) {
        // console.log(1);
        res.render('CheckoutPage.html');
    },

    load: function (req, res, next) {
        // console.log(req)
        // const uid= req.query.uid
        console.log("test");
        console.log(req)

        const uid = req.session.user._id;
        // console.log(user);
        console.log(uid);
        cartItems.find({'uid': uid}, function (err, result){
            if (err){
                res.send(null);
            }else{
                console.log("Load successfully!");
                res.send({item:result});
            }
        })

        // cartItems.find({'uid': uid}, function (err, result) {
        //     if (err) {
        //         res.send(null);
        //     } else {
        //         console.log("Load successfully!!");
        //         res.send({item: result});
        //     }
        // })
    },

    changeQuantity: function (req, res, next) {
        console.log(req)
        const uid = req.session.user._id;
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
        const uid = req.session.user._id;
        // const uid = req.body.uid;
        const phoneId = req.body.phoneId;
        console.log("backend received: ")
        console.log(uid);
        console.log(phoneId);

        cartItems.deleteOne({'uid': uid,'phoneId':phoneId}, function (err,result) {
            if (err) {
                res.send(err);
            }else{
                console.log("backend delete successfully!");
                res.send(result);
            }
        })
    },

    finalCheckout:async function(req, res, next){
        console.log('test req');
        console.log(req.body);
        const checkoutItems = req.body;

        for (let currentId in checkoutItems){
            let currentQuantity = checkoutItems[currentId];
            let newStock = 0;

            await phonesList.find({_id: currentId})
                .then(result => {
                    let currentStock = result[0].stock;
                    newStock = currentStock - currentQuantity;
                    console.log(newStock);
                })
                .catch(error => {})
            console.log(newStock);

            await phonesList.updateOne({_id: currentId},{stock:newStock})
                .then(result => {})
                .catch(error => {})
        }

        res.send(200);
    },


    emptyCart:function(req,res,next){
        const uid = req.session.user._id;
        // const uid = req.body.uid;
        console.log(uid);

        cartItems.deleteMany({uid:uid},function(err,result){
            if(err){
                res.send(err);
            }else{
                console.log(result);
                // res.send(result);
                // res.send(200);
                res.send({'code': 200});
            }

        })


    }

}