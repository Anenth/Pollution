var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Pollution = new Schema({
  Parameters: String,
  Date: String,
  Time: String,
  Concentration: Number,
  Unit: String,
  PrescribedStandard: String,
  Remarks: String,
  DataPoint: {
    station: String,
    name: Array,
    stateId: Number,
    cityId: Number,
    url: String
  }

});

mongoose.model('Pollution', Pollution);

