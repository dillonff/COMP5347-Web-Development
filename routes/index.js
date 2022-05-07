const express = require('express');
const router = express.Router();

router.get('/userPage', function(reg, res, next) {
  res.render('userPage', {});
});

module.exports = router;
