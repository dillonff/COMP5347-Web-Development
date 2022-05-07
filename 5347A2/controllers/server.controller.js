var UserInfo = require('../model/userModel');
var PhoneListing = require('../model/phoneModel');

module.exports.updateListingInfo = function(req, res) {
  newInfo = {
    title: req.body.title,
    stock: req.body.new_stock
  };

  PhoneListing.updateListingInfo(newInfo, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send('success updating');
    }
  });
};

module.exports.getUserId = function(req, res) {
  res.send(req.session.userId);
};

module.exports.getUserStatus = function(req, res) {
  if (req.session.isLogin) {
    res.send('loged');
  } else {
    res.send('unloged');
  }
};

module.exports.checkPwd = function(req, res) {
  if (req.body.userPwd == req.session.password) {
    res.send('correctpwd');
  } else {
    res.send('incorrectpwd');
  }
};

module.exports.getUserInfo = function(req, res) {
  userId = req.params.id;
  UserInfo.getUserInfo(userId, function(err, result) {
    if (err) {
      console.log('can not find info of ' + id);
    } else {
      res.json(result);
    }
  });
};

module.exports.updateUserInfo = function(req, res) {
  newInfo = {
    id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email
  };
  console.log(newInfo);

  UserInfo.updateUserInfo(newInfo, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send('successProfile');
    }
  });
};

module.exports.changePassword = function(req, res) {
  newPwd = {
    id: req.body.id,
    password: req.body.password
  };

  UserInfo.changePassword(newPwd, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      req.session.password = req.body.password;
      res.send('successPwd');
    }
  });
};

module.exports.addNewListing = function(req, res) {
  newListingInfo = {
    title: req.body.title,
    brand: req.body.brand,
    image: 'imageurl',
    stock: req.body.stock,
    seller: req.body.id,
    price: req.body.price
  };
  console.log(newListingInfo);

  PhoneListing.addNewListing(newListingInfo, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send('successAddListing');
    }
  });
};

module.exports.changeImageRoutes = function(req, res) {
  helloinfo = req.params.info;

  PhoneListing.changeImageRoutes(helloinfo, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send('successChangeImageRoutes');
    }
  });
};

module.exports.getRelatedPhoneListings = function(req, res) {
  sellerId = req.params.id;

  PhoneListing.getRelatedPhoneListings(sellerId, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};

module.exports.deletePhoneListings = function(req, res) {
  deleteId = req.body;

  PhoneListing.deletePhoneListings(deleteId, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send('successDelete');
    }
  });
};

module.exports.disablePhoneListings = function(req, res) {
  disableId = req.body;

  PhoneListing.disablePhoneListings(disableId, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log('disabled!!');
      res.send('successDisable');
    }
  });
};

module.exports.notDisablePhoneListings = function(req, res) {
  notdisableId = req.body;
  PhoneListing.notDisablePhoneListings(notdisableId, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log('not disabled!!');
      res.send('successNotDisable');
    }
  });
};
