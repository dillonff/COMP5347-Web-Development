const express =require('express')
const router=require('./routes/session')
const checkoutRouter = require('./routes/checkout')
const mainPageRoute = require('./routes/mainPage');
const bodyParser=require('body-parser')

const session =require('express-session')
const app = express();


app.engine('html',require('express-art-template'))


app.use(bodyParser.urlencoded({extended: true }))



app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))


app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}))

app.use(router)

app.use('/checkout', checkoutRouter);

app.use(mainPageRoute);

app.listen(3000,function(){
	console.log('app is running at port 3000')
})

module.exports=app