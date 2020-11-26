const base = require('../../../../jest.config.js');
const { name } = require('./package.json');

module.exports = {
  ...base,
  displayName: name,
  name
};
