var mongoose = require('mongoose'),
request = require('request'),
cheerio = require('cheerio'),
config = require('../../config/config'),
modal = require('../models/pollution'),
Pollution = mongoose.model('Pollution');


const DATAPOINTS = [
{
  station: 'BTM',
  name: ['South Bengaluru', 'Peenya'],
  stateId: 13,
  cityId: 136,
  url: 'http://www.cpcb.gov.in/CAAQM/frmCurrentDataNew.aspx?StationName=BTM&StateId=13&CityId=136'
},{
  station: 'Peenya',
  name: ['North Bengaluru', 'Peenya'],
  stateId: 13,
  cityId: 136,
  url: 'http://www.cpcb.gov.in/CAAQM/frmCurrentDataNew.aspx?StationName=Peenya&StateId=13&CityId=136'
},{
  station: 'BWSSB',
  name: ['Central Bengaluru', 'Kadabesanahalli'],
  stateId: 13,
  cityId: 136,
  url: 'http://www.cpcb.gov.in/CAAQM/frmCurrentDataNew.aspx?StationName=BWSSB&StateId=13&CityId=136'
}
];

const TABLE_STRUCT = [
'Parameters',
'Date',
'Time',
'Concentration',
'Unit',
'PrescribedStandard',
'Remarks'];

const selectors = {
  tableRow: '#lblReportCurrentData > table tr',
  item: 'td'
}

const ignoreString = 'Prescribed Standard for CO and OZONE is one hourly Average';

var Scrapper = {
  initialize: function(){
    var db = mongoose.connection;
    mongoose.connect(config.db);

    db.on('error', function (error) {
      throw new Error('unable to connect to database at ' + config.db, error);
    });
  },

  start: function(){
    this.initialize();
    this.run();
  },

  run: function(){
    DATAPOINTS.forEach(function(dataPoint){
      request(dataPoint.url, function(error, response, html){
        if(!error){
          var $ = cheerio.load(html);
          var rows = $(selectors.tableRow);
          var rowsLength = rows.length - 1;

          rows.each(function(i, row) {
            // Remove the table header
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
            Scrapper.saveData(rowData, dataPoint);
          })

        }
      })
    });
  },

  saveData: function(data, dataPoint){
    data['DataPoint'] = dataPoint;
    var pollutionRow = new Pollution(data);
    pollutionRow.save(function (err, data) {
      console.log(data);
      if (err) return Scrapper.handleError(err);
    });
  },

  handleError: function(err){
    console.error('Error', err);
  }
}

module.exports = Scrapper;
