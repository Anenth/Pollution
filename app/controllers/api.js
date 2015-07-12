var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Scrapper = require('../scrapper/init.js');
Pollution = mongoose.model('Pollution');

module.exports = function (app) {
  app.use('/api', router);
};

router.get('/recent', function (req, res, next) {
  var station = "Peenya";

  Pollution.find({ 'DataPoint.station': station})
    .sort({'Time': -1})
    .limit(20)
    .exec(function (err, items) {
      res.json({
        title: 'Polution',
        data: items
      });
  });
});



router.get('/collect', function (req, res, next) {
  Scrapper.run();
});



// if(PM2<=30)
//   indexOfPM2 = PM2*50/30;
// elseIf(PM2>30,PM2<=60)
//   indexOfPM2 = 50+(PM2-30)*50/30
// elseIf(PM2>60,PM2<=90)
//   indexOfPM2 = 100+(PM2-60)*100/30
// elseIf(PM2>90,PM2<=120)
//   indexOfPM2 = 200+(PM2-90)*(100/30)
// elseIf(PM2>120,PM2<=250)
//   indexOfPM2= 300+(PM2-120)*(100/130)
// elseIf(PM2>250)
//   indexOfPM2= 400+(PM2-250)*(100/130)


// if(SO2<=40)
//   indexOfSO2 = SO2*50/40
//  elseIf(SO2>40,SO2<=80)
//  indexOfSO2 = 50+(SO2-40)*50/40,
//  elseIf(SO2>80,SO2<=380)
//  indexOfSO2 = 100+(SO2-80)*100/300,
//  elseIf(SO2>380,SO2<=800)
//  indexOfSO2 = 200+(SO2-380)*(100/420),
//  elseIf(SO2>800,SO2<=1600)
//  indexOfSO2 = 300+(SO2-800)*(100/800),
//   elseIf(SO2>1600)
//   indexOfSO2 = 400+(SO2-1600)*(100/800)


// if(CO<=1,CO*50/1)
//   elseIf(CO>1,CO<=2)
//     indexOfCO = 50+(CO-1)*50/1
//   elseIf(CO>2,CO<=10)
//     indexOfCO = 100+(CO-2)*100/8
//   elseIf(CO>10,CO<=17)
//     indexOfCO = 200+(CO-10)*(100/7)
//   elseIf(CO>17,CO<=34)
//     indexOfCO = 300+(CO-17)*(100/17)
//   elseIf(CO>34)
//   indexOfCO = 400+(CO-34)*(100/17)

//   if(O3<=50,O3*50/50)
//     elseIf(O3>50,O3<=100)
//       indexOfO3 = 50+(O3-50)*50/50
//     elseIf(O3>100,O3<=168)
//       indexOfO3 = 100+(O3-100)*100/68
//     elseIf(O3>168,O3<=208)
//       indexOfO3 = 200+(O3-168)*(100/40)
//     elseIf(O3>208,O3<=748)
//       indexOfO3 = 300+(O3-208)*(100/539)
//   elseIf(O3>748)
//   indexOfO3 = 400+(O3-400)*(100/539)
