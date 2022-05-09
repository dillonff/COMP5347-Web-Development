const mongoose = require('./db');

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

userSchema.statics.getUsernameById = function (id, callback) {
	return this.findOne({_id: id}).exec(callback);
}

module.exports = mongoose.model("User",userSchema)