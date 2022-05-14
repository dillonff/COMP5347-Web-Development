const express = require("express");
const phoneController = require("../controllers/phoneController");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("index.html", {
    user: req.session.user,
  });
});

router.get("/index", function (req, res) {
  res.render("index.html", {
    user: req.session.user,
  });
});

router.get("/search", function (req, res) {
  res.render("search.html", {
    user: req.session.user,
  });
});
router.get("/item", function (req, res) {
  res.render("item.html", {
    user: req.session.user,
  });
});

router.get("/userPage", function (req, res) {
  res.render("userPage", {
    user: req.session.user,
  });
});

router.get("/search/getPhones", phoneController.getPhones);
router.get("/item/getPhoneById", phoneController.getPhoneById);
router.get("/item/getUsernameById", userController.getUsernameById);
router.get("/index/getPhones", phoneController.getPhones);
router.get("/search/getFilteredPhones", phoneController.getFilteredPhones);
router.get("/item/getCartItemByUserIdAndPhoneId", phoneController.getCartItemByUserIdAndPhoneId);

router.post("/item/insertItem", phoneController.insertItem);
router.post("/item/insertReview", phoneController.insertReview);

module.exports = router;
