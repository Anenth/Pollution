var express = require('express'),
mongoose = require('mongoose'),
request = require('request'),
cheerio = require('cheerio'),
config = require('../../config/config'),
modal = require('../models/pollution'),
Pollution = mongoose.model('Pollution');

var db = mongoose.connection;
mongoose.connect(config.db);

db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var URL = 'http://www.cpcb.gov.in/CAAQM/frmCurrentDataNew.aspx?StationName=BTM&StateId=13&CityId=136';
const TABLE_STRUCT = [
'Parameters',
'Date',
'Time',
'Concentration',
'Unit',
'PrescribedStandard',
'Remarks'];

request(URL, function(error, response, html){
  if(!error){

    var selectors = {
      tableRow: '#lblReportCurrentData > table tr',
      item: 'td'
    }

    var ignoreString = 'Prescribed Standard for CO and OZONE is one hourly Average';

    var handleError = function(err){
      console.error('Error', err);
    }

    var saveData = function(data){
      var pollutionRow = new Pollution(data);

      pollutionRow.save(function (err, data) {
        if (err) return handleError(err);
      });
    }

    var $ = cheerio.load(html);
    var rows = $(selectors.tableRow);
    var rowsLength = rows.length - 1;

    rows.each(function(i, row) {
      // Remove the table header and table footer
      if(i === 0) return;

      var $row = $(this);
      var rowData = {};

      if(i === rowsLength && $row.text().indexOf(ignoreString)) return;

      $row.find(selectors.item).each(function(i, item) {
        var $item = $(this);
        var value = $item.text();
        if(i === 3){
          value = parseInt(value);
        }
        var attribute = TABLE_STRUCT[i];
        rowData[attribute] = value;
      })
      saveData(rowData);
    })

  }
})
