var mongoose = require('mongoose'),
request = require('request'),
cheerio = require('cheerio'),
config = require('../../config/config'),
modal = require('../models/pollution'),
contants = require('./contants'),
Calc = require('./indexCalculator'),
Pollution = mongoose.model('Pollution');

var selectors = contants.selectors;

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
    contants.DATAPOINTS.forEach(function(dataPoint) {
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

            if (i === rowsLength && $row.text().indexOf(contants.ignoreString)) return;

            $row.find(selectors.item).each(function(i, item) {
              var $item = $(this);
              var value = $item.text();
              switch (i){
                case 2:
                  var date = rowData['Date'].split('/');
                  var time = value.split(':');
                  value = new Date(date[2], (parseInt(date[1]) - 1), date[0], time[0], time[1], time[2]);
                break;
                case 3:
                  value = parseInt(value);
                break;
              }
              var attribute = contants.TABLE_STRUCT[i];
              rowData[attribute] = value;
            })
            rowData['index'] = Calc.getIndexOf(rowData['Parameters'], rowData['Concentration']);
            Scrapper.saveData(rowData, dataPoint);
          })

        }
      })
    });
  },

  saveData: function(data, dataPoint) {
    data['DataPoint'] = dataPoint;
    var pollutionRow = new Pollution(data);
    console.log(data);

    // pollutionRow.save(function (err, data) {
    //   if (err) return Scrapper.handleError(err);
    // });
  },

  handleError: function(err) {
    console.error('Error', err);
  }
}

module.exports = Scrapper;
