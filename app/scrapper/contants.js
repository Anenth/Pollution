module.exports = {
  DATAPOINTS: [
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
  ],

  TABLE_STRUCT: [
  'parameters',
  'date',
  'time',
  'concentration',
  'unit',
  'prescribedStandard',
  'remarks'],

  selectors: {
    tableRow: '#lblReportCurrentData > table tr',
    item: 'td'
  },

  ignoreString: 'Prescribed Standard for',

  parameter: {
    CO: 'Carbon Monoxide',
    PM2: 'PM 2.5',
    SO2: 'Sulfur Dioxide'
  }

}
