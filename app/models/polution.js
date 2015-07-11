var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Polution = new Schema({
  NO2: Number,
  SO2: Number,
  text: Number,
  time: Date,
});

Polution.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Polution', Polution);

