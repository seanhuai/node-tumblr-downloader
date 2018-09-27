const Request = require('request-promise-native');
const Main = require('./main');
const config = require('./config');

const createOptions = (args)=>{
  const { host = config.proxy.host, 
    port = config.proxy.port, 
    timeout = config.proxy.timeout, 
    noProxy = config.proxy.noProxy } = args;
  const options = {timeout}
  if(!noProxy) {
    options.proxy = `http://${host}:${port}`
  }
  return options;
}

const setRequest = (options)=>{
  global.request = Request.defaults(createOptions(options));
  return new Main(options);
};

module.exports = setRequest;