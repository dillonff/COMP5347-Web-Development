//0.安装
//1.引包
var express =require('express')
var router=require('./routes/session')
var bodyParser=require('body-parser')
//2.创建你的服务器应用程序，也就是原来的http.createServer
var session =require('express-session')
var app=express()
//3.当服务器收到get/请求的时候，执行回调处理函数

//配置使用art-template模板引擎
app.engine('html',require('express-art-template'))

//配置模板引擎和body-parser 一定要在app.use(router)挂载路由之前
app.use(bodyParser.urlencoded({extended: true }))
// app.use(bodyParser.json())

//公开指定目录
app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))
// app.ues(express.static('./public/'))

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}))


//把路由容器挂载到app服务中
app.use(router)
//4.相当于server.listen

app.listen(3000,function(){
	console.log('app is running at port 3000')
})

module.exports=app