var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var config = require('../../config/config');
var modal = require('../models/pollution');
var constants = require('./constants');
var Calc = require('./indexCalculator');
var Pollution = mongoose.model('Pollution');

var selectors = constants.selectors;

var Scrapper = {
  initialize: function() {
    var db = mongoose.connection;
    mongoose.connect(config.db);

    db.on('error', function(error) {
      throw new Error('unable to connect to database at ' + config.db, error);
    });
  },

  start: function() {
    this.initialize();
    this.run();
  },

  run: function() {
    constants.DATAPOINTS.forEach(function(dataPoint) {
      request(dataPoint.url, function(error, response, html) {
        if (!error) {
          var $ = cheerio.load(html);
          var rows = $(selectors.tableRow);
          var rowsLength = rows.length - 1;

          rows.each(function(i, row) {
            // Remove the table header
            if (i === 0) return;

            var $row = $(this);
            var rowData = {};

            if (i === rowsLength && $row.text().indexOf(constants.ignoreString)) return;

            $row.find(selectors.item).each(function(i, item) {
              var $item = $(this);
              var value = $item.text();
              switch (i){
                case 2:
                  var date = rowData['date'].split('/');
                  var time = value.split(':');
                  value = new Date(date[2], (parseInt(date[1]) - 1), date[0], time[0], time[1], time[2]);
                break;
                case 3:
                  value = parseInt(value);
                break;
              }
              var attribute = constants.TABLE_STRUCT[i];
              rowData[attribute] = value;
            })

            rowData['index'] = Calc.getIndexOf(rowData['parameters'], rowData['concentration']);
            Scrapper.saveData(rowData, dataPoint);
          })

        }
      })
    });
  },

  saveData: function(data, dataPoint) {
    data['datapoint'] = dataPoint;
    var pollutionRow = new Pollution(data);

    pollutionRow.save(function(err, data) {
      if (err) return Scrapper.handleError(err);
      console.log(data);
    });
  },

  handleError: function(err) {
    console.error('Error', err);
  }
}

module.exports = Scrapper;
