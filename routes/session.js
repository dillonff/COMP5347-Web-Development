var express = require('express');
var sessionController=require('../controllers/sessionController');
var router = express.Router();

router.get('/login', sessionController.loginPage);

router.post('/login',sessionController.login);

router.get('/logout',sessionController.logout );

router.get('/register',sessionController.registerPage);

router.post('/register',sessionController.register);

router.post('/saveLastPage',sessionController.saveLastPage);

router.get('/activate',sessionController.activate);

router.get('/verification',sessionController.verificationPage);

router.post('/verification',sessionController.verification);

router.get('/jump',sessionController.jump);

router.get('/reset',sessionController.resetPage);

router.post('/reset',sessionController.reset);

module.exports = router;