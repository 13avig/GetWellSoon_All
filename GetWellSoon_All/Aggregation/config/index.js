const config = require('dotenv').config();
const localConfig = require('./local');
const prodConfig = require('./prod');

module.exports = Object.assign({
  ...config.parsed,
  port: 3000
}, (config.ENV === 'prod' ? prodConfig : localConfig));
