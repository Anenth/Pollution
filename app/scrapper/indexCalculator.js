var constants = require('./constants');

var IndexCalculator = {
  getIndexOf: function(parameter, value) {
    switch (parameter) {
      case constants.parameter.PM2:
        return calculateForPM2(value);
      break;

      case constants.parameter.SO2:
        return calculateForSO2(value);
      break;

      case constants.parameter.CO:
        return calculateForCO(value);
      break;

      case constants.parameter.O3:
        return calculateForO3(value);
      break;

      default:
        return 0;

    }
  }
}

module.exports = IndexCalculator;

var calculateForPM2 = function(value) {
  var index = 0;

  if (value <= 30)
    index = value * 50 / 30;
  else if (value > 30 && value <= 60)
    index = 50 + (value - 30) * 50 / 30
  else if (value > 60 && value <= 90)
    index = 100 + (value - 60) * 100 / 30
  else if (value > 90 && value <= 120)
    index = 200 + (value - 90) * (100 / 30)
  else if (value > 120 && value <= 250)
    index = 300 + (value - 120) * (100 / 130)
  else if (value > 250)
    index = 400 + (value - 250) * (100 / 130)

  return index;
}

var calculateForSO2 = function(value) {
  var index = 0;

  if (value <= 40)
    index = value * 50 / 40
  else if (value > 40 && value <= 80)
    index = 50 + (value - 40) * 50 / 40
  else if (value > 80 && value <= 380)
    index = 100 + (value - 80) * 100 / 300
  else if (value > 380 && value <= 800)
    index = 200 + (value - 380) * (100 / 420)
  else if (value > 800 && value <= 1600)
    index = 300 + (value - 800) * (100 / 800)
  else if (value > 1600)
    index = 400 + (value - 1600) * (100 / 800)

  return index;
}

var calculateForCO = function(value) {
  var index = 0;

  if (value <= 1)
    index = value * 50 / 1
  else if (value > 1 && value <= 2)
    index = 50 + (value - 1) * 50 / 1
  else if (value > 2 && value <= 10)
    index = 100 + (value - 2) * 100 / 8
  else if (value > 10 && value <= 17)
    index = 200 + (value - 10) * (100 / 7)
  else if (value > 17 && value <= 34)
    index = 300 + (value - 17) * (100 / 17)
  else if (value > 34)
    index = 400 + (value - 34) * (100 / 17)

  return index;
}

var calculateForO3 = function(value) {
  var index = 0;

  if (value <= 50)
    index = value * 50 / 50
  else if (value > 50 && value <= 100)
    index = 50 + (value - 50) * 50 / 50
  else if (value > 100 && value <= 168)
    index = 100 + (value - 100) * 100 / 68
  else if (value > 168 && value <= 208)
    index = 200 + (value - 168) * (100 / 40)
  else if (value > 208 && value <= 748)
    index = 300 + (value - 208) * (100 / 539)
  else if (value > 748)
    index = 400 + (value - 400) * (100 / 539)

  return index;
}
