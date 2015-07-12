var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Scrapper = require('../scrapper/init.js');
Pollution = mongoose.model('Pollution');

module.exports = function (app) {
  app.use('/api', router);
};

router.get('/recent', function (req, res, next) {
  var station = "Peenya";

  Pollution.find({ 'DataPoint.station': station})
    .sort({'Time': -1})
    .limit(20)
    .exec(function (err, items) {
      res.json({
        title: 'Polution',
        data: items
      });
  });
});



router.get('/collect', function (req, res, next) {
  Scrapper.run();
});

router.get('/mig', function (req, res, next) {
  Pollution.find({})
    .exec(function (err, items) {


      res.json({
        title: 'Polution',
        data: items
      });
  });
});
