var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Polution = new Schema({
  NOX: Number,
  NO: Number,
  NO2: Number,
  SO2: Number,
  PM25: Number,
  time: Date
});

Polution.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Polution', Polution);

