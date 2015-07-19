var objTest = require('./init.js');
var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '0 */15 * * * *',
  onTick: function() {
    objTest.start();
  },

  start: false
});
job.start();
