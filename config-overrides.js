const path = require('path');

module.exports = function override(config) {
  config.resolve.modules = [path.join(__dirname, 'src')].concat(
    config.resolve.modules,
  );

  return config;
};
