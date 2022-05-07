const express = require('express');
const controller = require('../controllers/server.controller');
const router = express.Router();

router.get('/userPage', function(reg, res, next) {
  res.render('userPage', {});
});

router.get('/userPage/getUserId', controller.getUserId);
router.get('/userPage/getUserInfo/:id', controller.getUserInfo);
router.post('/userPage/updateUserInfo', controller.updateUserInfo);
router.post('/userPage/checkPwd', controller.checkPwd);
router.post('/userPage/userInfo/pwd', controller.changePassword);
router.post('/userPage/userInfo/newlisting', controller.addNewListing);
router.get('/userPage/getUserStatus', controller.getUserStatus);
router.get('/userPage/changeImageRoutes/:info', controller.changeImageRoutes);
router.get('/userPage/phoneListings/:id', controller.getRelatedPhoneListings);
router.post('/userPage/deletePhoneListings', controller.deletePhoneListings);
router.post('/userPage/disablePhoneListings', controller.disablePhoneListings);
router.post(
  '/userPage/notDisablePhoneListings',
  controller.notDisablePhoneListings
);

module.exports = router;
