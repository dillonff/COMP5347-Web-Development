const express = require("express");
const phoneController = require("../controllers/phoneController");
const userController = require("../controllers/userController");
const sessionController = require("../controllers/sessionController");

const router = express.Router();

router.get("/index", function (req, res, next) {
  res.render("index.html", {
    user: req.session.user,
  });
});

router.get("/search", function (req, res, next) {
  res.render("search.html", {
    user: req.session.user,
  });
});
router.get("/item", function (req, res, next) {
  res.render("item.html", {
    user: req.session.user,
  });
});

router.get("/userPage", function (req, res, next) {
  res.render("userPage", {
    user: req.session.user,
  });
});

router.get("/search/getPhones", phoneController.getPhones);
router.get("/item/getPhoneById", phoneController.getPhoneById);
router.get("/item/getUsernameById", userController.getUsernameById);
router.get("/index/getHighRatingPhones", phoneController.getHighRatingPhones);
router.get("/index/getPhones", phoneController.getPhones);
router.get("/search/getFilteredPhones", phoneController.getFilteredPhones);
router.get("/item/insertItem", phoneController.insertItem);

router.post("/item/insertReview", phoneController.insertReview);

module.exports = router;
