const mongoose = require('./database');

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
  if (keyWord !== '') {
    predicate['title'] = { $regex: keyWord, $options: '$i' };
  }
  if (brand !== 'All') {
    predicate['brand'] = brand;
  }
  if (price !== 'All') {
    predicate['price'] = { $lt: price };
  }
  return this.find(predicate).exec(callback);
};

phoneSchema.statics.getPhoneById = function (id, callback) {
  return this.findById(id).exec(callback);
};

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
  // console.log('change image route', data);
  return this.updateMany(
    {},
    [{ $set: { image: { $concat: ['public/images/', '$brand', '.jpeg'] } } }],
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
  return this.updateMany(
    { _id: { $in: disableId } },
    { $set: { disabled: true } },
    { multi: 1 }
  ).exec(callback);
};

phoneSchema.statics.notDisablePhoneListings = function (
  notDisableId,
  callback
) {
  return this.updateMany(
    { _id: { $in: notDisableId } },
    { $set: { disabled: false } },
    { multi: 1 }
  ).exec(callback);
};

module.exports = mongoose.model('phones', phoneSchema, 'phonelist');
