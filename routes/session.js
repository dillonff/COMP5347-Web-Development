var fs =require('fs')

var express =require('express')
//创建一个路由容器
var router =express.Router()

var Users =require('../models/users')

var md5 =require('md5')

var nodemailer =require('nodemailer')
var transporter =nodemailer.createTransport({
	host:'smtp.qq.com',
	secureConnection:true,
	port:465,
	secure:true,
	auth:{
		user: '1263558065@qq.com',
		pass: 'phkfezzaqeregjbc'
	}
})

//首页
	router.get('/',function(req,res){
	
		Users.find(function(err,users){
			if(err){
				return res.status(500).send('Server error')
			}
			res.render('index.html',{
				users:users,
				user:req.session.user
			})
		})
		
	})
	//登陆
	router.get('/login', function(req, res) {
		res.render('login.html')
	})
	
	router.post('/login', function(req, res) {
		var loginEmail=req.body.email
		var loginPass=md5(req.body.password)
		req.session.isLogin= true
		Users.findOne({
			email: loginEmail,
			password: loginPass
		},function(err,user){
			if(err){
				return res.status(500).json({
					err_code:500,
					message: err.message
				})
			}
			
			if(!user){
				return res.status(200).json({
					err_code:1,
					message: 'Email or Password is invalid'
				})
			}
			//用户存在，登陆成功，记录状态
			req.session.user = user
			res.status(200).json({
				err_code:0,
				message: 'ok'
			})
		})
	
	})
	//登出
	router.get('/logout', function(req, res) {
		//清除登陆状态，重定向到登录页
		req.session.user=null
		res.redirect('/')
	})
    //注册
	router.get('/register', function(req, res) {
		res.render('register.html')
	})
	
	router.post('/register', function(req, res) {
		var body=req.body
		Users.findOne({
			email:body.email
		},function(err,data){
			if(err){
				return res.status(500).json({
					err_code: 500,
					message: 'Server error'
				})
			}
			if(data){
				//邮箱重复
				return res.status(200).json({
					err_code: 1,
					message: 'Email already exists'
				}
				)
			}
			body.password='NV_'+md5(body.password)
			new Users(req.body).save(function(err,user){
				if(err){
					return res.status(500).json({
						err_code: 500,
						message: 'Server error'
					})
				}
				
				req.session.user= user
				
				res.status(200).json({
					err_code: 0,
					message: 'ok'
				})
				//验证邮箱
				var mailOptions={
					from: '1263558065@qq.com',
					to: body.email,
					subject: 'vertify email address',
					 html:`<a href="http://127.0.0.1:3000/activate?email=${body.email}&password=${body.password}">click to verify the address</a>`		
				}
				transporter.sendMail(mailOptions,function(err,info){
					if(err){
						console.log(err)
					}else{
						console.log('邮件发送:'+ info.respond)
					}
				})
			
			})
			
		})
	
	})	
		
	
	//激活邮箱
	router.get('/activate', function(req, res) {
		var activateEmail=req.query.email
		var activatePass=req.query.password
		activatePass=activatePass.substring(3)
		console.log(activatePass)
		Users.updateOne({email: activateEmail},{$set:{password:activatePass}},function(err,data){
		if(err){
		return res.status(500).send('Server error')
		}
		    res.render('activate.html')
		})
		
	
	})
	
	//验证邮箱是否存在
	router.get('/verification', function(req, res) {
		res.render('verification.html')
		
	})
	
	router.post('/verification', function(req, res) {
		var userEmail=req.body
		var email=req.body.email
		//查找数据库中是否用户使用这个邮箱
		Users.find(
			userEmail
		,function(err,user){
			if(err){
				return res.status(500).json({
					err_code: 500,
					message: 'Server error'
				})
			}else{
				console.log(user)
				if(user.length===0){
					return res.status(200).json({
						err_code: 1,
						message: 'email not exists'
					})
				}else{
					
					return res.status(200).json({
						email:email,
						err_code: 0,
						message: 'ok'
					})
				}
			}
		})
		
	})
	
	
	router.get('/jump', function(req, res) {
		res.render('jump.html')
		var userEmail = req.query.email
		var mailOptions={
			from: '1263558065@qq.com',
			to: userEmail,
			subject: 'change password',
			html:`<a href="http://127.0.0.1:3000/reset?email=${userEmail}">click to change password</a>`
		}
		
		transporter.sendMail(mailOptions,function(err,info){
			if(err){
				console.log(err)
			}else{
				console.log('邮件发送:'+ info.respond)
			}
		})
	
	
	})
	

	router.get('/reset', function(req, res) {
		var email = req.query.email
		req.session.userEmail= email
		res.render('reset.html')
	})
	
	router.post('/reset', function(req, res) {
		var Cpass=req.body.Cpassword
		var newPass=req.body.password
		if(Cpass===newPass){
			var email = req.session.userEmail
			newPass=md5(req.body.password)
			Users.updateOne({email: email},{$set:{password:newPass}},function(err,data){
			if(err){
			  return res.status(500).json({
			  	err_code: 500,
			  	message: 'Server error'
			  })
			}else{
				return res.status(200).json({
					err_code: 0,
					message: 'ok'
				})
			}
			})
		}else{
			return res.status(200).json({
				err_code: 1,
				message: 'two password are different'
			})
		}
		
	
	})
	
	module.exports =router
