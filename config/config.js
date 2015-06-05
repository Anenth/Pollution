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
    db: 'mongodb://localhost/code-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'code'
    },
    port: 3000,
    db: 'mongodb://localhost/code-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'code'
    },
    port: 3000,
    db: 'mongodb://localhost/code-production'
  }
};

module.exports = config[env];
