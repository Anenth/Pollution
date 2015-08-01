var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Scrapper = require('../scrapper/init.js');
var Pollution = mongoose.model('Pollution');
var DATAPOINTS = require('../scrapper/constants').DATAPOINTS;
var Promise = require('promise');
var _ = require('underscore');

module.exports = function(app) {
  app.use('/api', router);
};

router.get('/recent', function(req, res, next) {
  var promises = [];
  DATAPOINTS.forEach(function(datapoint) {
    var station = datapoint.station;
    promises.push(new Promise(function(resolve, reject) {
      Pollution.find({ 'datapoint.station': station})
        .sort({time: -1})
        .limit(10)
        .exec(function(err, items) {
          var maxItem = _.max(items, function(item) {
            return item.index
          });

          resolve(maxItem);
        });
    }))

  });

  Promise.all(promises).then(function(data) {
    res.json(data);
  })
});

router.get('/collect', function(req, res, next) {
  Scrapper.run();
});

router.get('/mig', function(req, res, next) {
  Pollution.find({})
    .exec(function(err, items) {

      res.json({
        title: 'Polution',
        data: items
      });
    });
});
