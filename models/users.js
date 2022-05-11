const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/mydb')

const Schema = mongoose.Schema

const userSchema = new Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

// module.exports = mongoose.model("User",userSchema)
const userList = mongoose.model('userlist', userSchema, 'userlist');

mongoose.connect('mongodb://localhost:27017/mydb', (err) => {
	if(err) {
		console.log("user Connect failed!");
	}else {
		console.log("user Connect successfully!");
	}
});
module.exports = userList
