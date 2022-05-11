var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/userlist')

var Schema = mongoose.Schema

var userSchema = new Schema({
	firstname: {
		type:String,
		required: true
	},
	lastname: {
		type:String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type:String,
		required: true
	}
})

module.exports = mongoose.model("User",userSchema)