const Request = require('request-promise-native');
const config = require('./config');

const request = Request.defaults({
  timeout: config.proxy.timeout,
  proxy: `http://${config.proxy.host}:${config.proxy.port}`
})

module.exports = request;