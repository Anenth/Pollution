var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pollution = new Schema({
  parameters: String,
  date: String,
  time: Date,
  concentration: Number,
  unit: String,
  prescribedStandard: String,
  remarks: String,
  datapoint: {
    station: String,
    name: Array,
    stateId: Number,
    cityId: Number,
    url: String
  },
  index: Number

});

mongoose.model('Pollution', Pollution);

