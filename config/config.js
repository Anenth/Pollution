var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'code'
    },
    port: 3000,
    db: 'mongodb://anenth:-6r#=T514awAuVPb^@ds043262.mongolab.com:43262/polution'
  },

  test: {
    root: rootPath,
    app: {
      name: 'code'
    },
    port: 3000,
    db: 'mongodb://anenth:-6r#=T514awAuVPb^@ds043262.mongolab.com:43262/polution'
  },

  production: {
    root: rootPath,
    app: {
      name: 'code'
    },
    port: 3000,
    db: 'mongodb://anenth:-6r#=T514awAuVPb^@ds043262.mongolab.com:43262/polution'
  }
};

module.exports = config[env];
