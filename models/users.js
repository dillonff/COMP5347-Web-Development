const mongoose = require("./database");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.getUsernameById = function (id, callback) {
  return this.findOne({ _id: id }).exec(callback);
};

userSchema.statics.getUserInfo = function (id, callback) {
  return this.find({ _id: id }).exec(callback);
};

userSchema.statics.updateUserInfo = function (data, callback) {
  return this.update(
    { _id: data.id },
    {
      $set: {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
      },
    },
    { multi: false }
  ).exec(callback);
};

userSchema.statics.changePassword = function (data, callback) {
  return this.update(
    { _id: data.id },
    { $set: { password: data.password } },
    { multi: false }
  ).exec(callback);
};

const userList = mongoose.model("userlist", userSchema, "userlist");

module.exports = userList;
