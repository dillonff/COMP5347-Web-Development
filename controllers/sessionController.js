const express = require('express');

const Users = require('../models/users');

const md5 = require('md5');

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
	host: 'smtp.qq.com',
	secureConnection: true,
	port: 465,
	secure: true,
	auth: {
		user: '1263558065@qq.com',
		pass: 'phkfezzaqeregjbc'
	}
});

module.exports ={
	loginPage: function(req, res) {
		res.render('login.html',{
			lastPageUrl:req.session.lastPageUrl,
		});
	},
	
	login: function(req, res) {
		const loginEmail = req.body.email;
		const loginPass = md5(req.body.password);
		req.session.isLogin = true;
		Users.findOne({
			email: loginEmail,
			password: loginPass
		},function(err,user) {
			if(err) {
				return res.status(500).json({
					err_code:500,
					message: err.message
				});
			}
			
			if(!user) {
				return res.status(200).json({
					err_code:1,
					message: 'Email or Password is invalid'
				});
			}

			req.session.user = user;
			res.status(200).json({
				err_code:0,
				message: 'ok'
			});
		});
	},
	
	logout: function(req, res) {
		req.session.user = null;
		res.redirect('/');
	},
	
	registerPage: function(req, res) {
		res.render('register.html');
	},
	
	saveLastPage: function(req, res) {
		req.session.lastPageUrl = req.body.lastPage;
		res.status(200).json({
			err_code:0,
			message: 'ok'
		});
	},
	
	register: function(req, res) {
		const body = req.body;
		Users.findOne({
			email:body.email
		},function(err,data) {
			if(err) {
				return res.status(500).json({
					err_code: 500,
					message: 'Server error'
				});
			}
			if(data) {
				return res.status(200).json({
					err_code: 1,
					message: 'Email already exists'
				});
			}
			body.password = 'NV_' + md5(body.password);
			new Users(req.body).save(function(err, user) {
				if(err) {
					return res.status(500).json({
						err_code: 500,
						message: 'Server error'
					});
				}
				
				req.session.user = user;
				
				res.status(200).json({
					err_code: 0,
					message: 'ok'
				});
				const mailOptions = {
					from: '1263558065@qq.com',
					to: body.email,
					subject: 'vertify email address',
					html: `<a href="http://localhost:3000/activate?email=${body.email}&password=${body.password}">click to verify the address</a>`
				};
				transporter.sendMail(mailOptions,function(err, info) {
					if(err){
						console.log(err);
					}else{
						console.log('email has been send');
					}
				});
			});
		});
	},
	
	activate: function(req, res) {
		const activateEmail = req.query.email;
		let activatePass = req.query.password;
		activatePass = activatePass.substring(3);
		Users.updateOne({email: activateEmail},{$set:{password:activatePass}},function(err,data) {
		if(err){
			return res.status(500).send('Server error');
		}
		    res.render('activate.html');
		})
	},
	
	verificationPage: function(req, res) {
		res.render('verification.html');
	},
	
	verification:function(req, res) {
		const userEmail = req.body;
		const email = req.body.email;
		Users.find(
			userEmail,
			function(err, user) {
			if(err) {
				return res.status(500).json({
					err_code: 500,
					message: 'Server error'
				});
			}
			else {
				if(user.length === 0) {
					return res.status(200).json({
						err_code: 1,
						message: 'email not exists'
					});
				}
				else {
					return res.status(200).json({
						email:email,
						err_code: 0,
						message: 'ok'
					});
				}
			}
		});
	},
	
	jump: function(req, res) {
		res.render('jump.html');
		const userEmail = req.query.email;
		const mailOptions = {
			from: '1263558065@qq.com',
			to: userEmail,
			subject: 'change password',
			html: `<a href="http://localhost:3000/reset?email=${userEmail}">click to change password</a>`
		};

		transporter.sendMail(mailOptions,function(err,info) {
			if(err) {
				console.log(err);
			}
			else {
				console.log('email has been send');
			}
		});
	},
	
	resetPage:function(req, res) {
		req.session.userEmail = req.query.email;
		res.render('reset.html');
	},
	
	reset:function(req, res) {
		const Cpass = req.body.Cpassword;
		let newPass = req.body.password;
		if(Cpass === newPass){
			const email = req.session.userEmail;
			newPass = md5(req.body.password);
			Users.updateOne({email: email},{$set:{password:newPass}},function(err,data) {
				if(err) {
				  return res.status(500).json({
					err_code: 500,
					message: 'Server error'
				  });
				}
				else {
					return res.status(200).json({
						err_code: 0,
						message: 'ok'
					});
				}
			});
		}
		else {
			return res.status(200).json({
				err_code: 1,
				message: 'two passwords are different'
			});
		}
	}
}