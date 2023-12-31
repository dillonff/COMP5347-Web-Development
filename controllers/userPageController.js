const UserInfo = require('../models/users');
const PhoneListing = require('../models/phones');

module.exports.updateListingInfo = function (req, res) {
  newInfo = {
    title: req.body.title,
    stock: req.body.new_stock,
  };

  PhoneListing.updateListingInfo(newInfo, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send('success updating');
    }
  });
};

module.exports.getUserId = function (req, res) {
  userId = req.session.user._id;

  res.send(userId);
};

module.exports.checkPwd = function (req, res) {
  if (req.body.userPwd == req.session.user.password) {
    res.send('correctpwd');
  } else {
    res.send('incorrectpwd');
  }
};

module.exports.getUserInfo = function (req, res) {
  userId = req.params.id;
  UserInfo.getUserInfo(userId, function (err, result) {
    if (err) {
      console.log('can not find user of this ID:' + id);
    } else {
      res.json(result);
    }
  });
};

module.exports.updateUserInfo = function (req, res) {
  newInfo = {
    id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
  };

  UserInfo.updateUserInfo(newInfo, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};

module.exports.changePassword = function (req, res) {
  newPwd = {
    id: req.body.id,
    password: req.body.password,
  };

  UserInfo.changePassword(newPwd, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      req.session.password = req.body.password;
      res.json(result);
    }
  });
};

module.exports.addNewListing = function (req, res) {
  newListingInfo = {
    title: req.body.title,
    brand: req.body.brand,
    image: 'imageurl',
    stock: req.body.stock,
    seller: req.body.id,
    price: req.body.price,
  };

  PhoneListing.addNewListing(newListingInfo, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};

module.exports.changeImageRoutes = function (req, res) {
  info = req.params.info;

  PhoneListing.changeImageRoutes(info, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};

module.exports.getRelatedPhoneListings = function (req, res) {
  sellerId = req.params.id;

  PhoneListing.getRelatedPhoneListings(sellerId, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};

module.exports.deletePhoneListings = function (req, res) {
  deleteId = req.body.deleteId;

  PhoneListing.deletePhoneListings(deleteId, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};

module.exports.disablePhoneListings = function (req, res) {
  disableId = req.body.disableId;

  PhoneListing.disablePhoneListings(disableId, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};

module.exports.notDisablePhoneListings = function (req, res) {
  notdisableId = req.body.notDisableId;
  PhoneListing.notDisablePhoneListings(notdisableId, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};
