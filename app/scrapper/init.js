var express = require('express'),
mongoose = require('mongoose'),
request = require('request'),
cheerio = require('cheerio'),
config = require('../../config/config'),
modal = require('../models/polution'),
Polution = mongoose.model('Polution');

var db = mongoose.connection;
mongoose.connect(config.db);

db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var URL = 'http://www.cpcb.gov.in/CAAQM/frmCurrentDataNew.aspx?StationName=BTM&StateId=13&CityId=136';

request(URL, function(error, response, html){
  if(!error){

    var stru = [
    'para',
    'date',
    'time',
    'conc',
    'unit',
    'preConc'
    ]
    var selectors = {
      tableRow: '#lblReportCurrentData > table tr',

    }

    var $ = cheerio.load(html);
    console.log($(selectors.tableRow));

    var json = {
    };
  }
})
