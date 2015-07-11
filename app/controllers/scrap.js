var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');

module.exports = function (app) {
  app.use('/scrap', router);
};

router.get('/scrap', function (req, res, next) {

});
