var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Pollution = mongoose.model('Pollution');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  Pollution.find(function (err, items) {
    if (err) return next(err);
    res.render('index', {
      title: 'Polution',
      data: items
    });
  });
});
