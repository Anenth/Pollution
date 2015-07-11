var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  request = require('request'),
  cheerio = require('cheerio'),
  Polution = mongoose.model('Polution');

module.exports = function (app) {
  app.use('/scrap', router);
};

router.get('/scrap', function (req, res, next) {

});
