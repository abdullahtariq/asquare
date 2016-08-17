var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'facing-app'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://facing:facing123@ds161245.mlab.com:61245/facing-app'
  },

  test: {
    root: rootPath,
    app: {
      name: 'facing-app'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/facing-app-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'facing-app'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/facing-app-production'
  }
};

module.exports = config[env];
