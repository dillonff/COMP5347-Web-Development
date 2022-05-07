const mongoose = require('./db');

const phoneSchema = new mongoose.Schema(
  {
    title: String,
    brand: String,
    image: String,
    stock: Number,
    seller: String,
    price: Number,
    disabled: String,
    avgRating: Number
  },
  {
    versionKey: false
  }
);

// const reviewsSchema = new mongoose.Schema(
//   {
//     reviewer: String,
//     rating: Number,
//     comment: String
//   },
//   {
//     versionKey: false
//   }
// );

phoneSchema.statics.updateListingInfo = function(data, callback) {
  console.log(data);

  return this.updateMany(
    { title: data.title },
    { $set: { stock: data.stock } },
    { multi: false }
  ).exec(callback);
};

phoneSchema.statics.addNewListing = function(data, callback) {
  return this.create(
    {
      title: data.title,
      brand: data.brand,
      image: data.image,
      stock: data.stock,
      seller: data.seller,
      price: data.price
    },
    callback
  );
};

phoneSchema.statics.changeImageRoutes = function(data, callback) {
  console.log('change image route', data);
  return this.updateMany(
    {},
    [{ $set: { image: { $concat: ['images/', '$brand', '.jpeg'] } } }],
    { multi: true },
    callback
  );
};

phoneSchema.statics.getRelatedPhoneListings = function(data, callback) {
  return this.find({ seller: data }).exec(callback);
};

phoneSchema.statics.deletePhoneListings = function(deleteId, callback) {
  return this.deleteMany({ _id: { $in: deleteId } }, callback);
};

phoneSchema.statics.disablePhoneListings = function(disableId, callback) {
  console.log('disableId:', disableId);
  return this.update(
    { _id: { $in: disableId } },
    { $set: { disabled: '' } },
    { multi: 1 }
  ).exec(callback);
};

phoneSchema.statics.notDisablePhoneListings = function(notDisableId, callback) {
  console.log('notDisableId:', notDisableId);
  return this.update(
    { _id: { $in: notDisableId } },
    { $unset: { disabled: '' } },
    { multi: 1 }
  ).exec(callback);
};

const phoneModel = mongoose.model('phones', phoneSchema, 'phonelisting');

module.exports = phoneModel;
