const mongoose = require("mongoose");

const phoneSchema = new mongoose.Schema(
  {
    title: String,
    brand: String,
    image: String,
    stock: Number,
    seller: String,
    price: Number,
    disabled: Boolean,
    reviews: {
      reviewer: String,
      rating: Number,
      comment: String,
    },
  },
  {
    versionKey: false,
  }
);

phoneSchema.statics.getPhones = function (callback) {
  return this.find({ disabled: { $ne: true }, stock: { $ne: 0 } }).exec(
    callback
  );
};

phoneSchema.statics.getFilteredPhones = function (
  keyWord,
  brand,
  price,
  callback
) {
  let predicate = { disabled: { $ne: true }, stock: { $ne: 0 } };
  if (keyWord !== "") {
    predicate["title"] = { $regex: keyWord, $options: "$i" };
  }
  if (brand !== "All") {
    predicate["brand"] = brand;
  }
  if (price !== "All") {
    predicate["price"] = { $lt: price };
  }
  return this.find(predicate).exec(callback);
};

phoneSchema.statics.getPhoneById = function (id, callback) {
  return this.findById(id).exec(callback);
};

<<<<<<< HEAD
phoneSchema.statics.insertReview = function (
  phoneId,
  userId,
  rating,
  comment,
  callback
) {
  this.update(
    { _id: phoneId },
    {
      $push: {
        reviews: { reviewer: userId, rating: rating, comment: comment },
      },
=======
phoneSchema.statics.getPhoneByTitle = function (title, callback) {
    return this.find({title: title}).exec(callback);
};

phoneSchema.statics.insertReview = function (phoneId, userId, rating, comment, callback) {
    this.update(
        {_id: phoneId},
        {$push: {reviews: {reviewer: userId, rating: rating, comment: comment}}}
    ).exec(callback);
};

module.exports = mongoose.model('phones', phoneSchema, 'phonelist');

mongoose.connect('mongodb://localhost:27017/mydb', (err) => {
    if(err) {
        console.log("phonelist Connect failed!");
    }else {
        console.log("phonelist Connect successfully!");
>>>>>>> b9e8c13d5dbb9ce7fa0e7c214edad7c9606cda83
    }
  ).exec(callback);
};

phoneSchema.statics.updateListingInfo = function (data, callback) {
  console.log(data);

  return this.updateMany(
    { title: data.title },
    { $set: { stock: data.stock } },
    { multi: false }
  ).exec(callback);
};

phoneSchema.statics.addNewListing = function (data, callback) {
  return this.create(
    {
      title: data.title,
      brand: data.brand,
      image: data.image,
      stock: data.stock,
      seller: data.seller,
      price: data.price,
    },
    callback
  );
};

phoneSchema.statics.changeImageRoutes = function (data, callback) {
  console.log("change image route", data);
  return this.updateMany(
    {},
    [{ $set: { image: { $concat: ["images/", "$brand", ".jpeg"] } } }],
    { multi: true },
    callback
  );
};

phoneSchema.statics.getRelatedPhoneListings = function (data, callback) {
  return this.find({ seller: data }).exec(callback);
};

phoneSchema.statics.deletePhoneListings = function (deleteId, callback) {
  return this.deleteMany({ _id: { $in: deleteId } }, callback);
};

phoneSchema.statics.disablePhoneListings = function (disableId, callback) {
  console.log("disableId:", disableId);
  return this.update(
    { _id: { $in: disableId } },
    { $set: { disabled: "" } },
    { multi: 1 }
  ).exec(callback);
};

phoneSchema.statics.notDisablePhoneListings = function (
  notDisableId,
  callback
) {
  console.log("notDisableId:", notDisableId);
  return this.update(
    { _id: { $in: notDisableId } },
    { $unset: { disabled: "" } },
    { multi: 1 }
  ).exec(callback);
};

module.exports = mongoose.model("phones", phoneSchema, "phonelist");

mongoose.connect("mongodb://localhost:27017/mydb", (err) => {
  if (err) {
    console.log("phonelist Connect failed!");
  } else {
    console.log("phonelist Connect successfully!");
  }
});
