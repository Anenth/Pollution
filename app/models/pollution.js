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

});

// Pollution.virtual('date')
//   .get(function(){
//     return this._id.getTimestamp();
//   });

mongoose.model('Pollution', Pollution);

