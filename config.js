const config = {
  api: {
    baseURL: 'https://api.tumblr.com/v2', // 主API版本
    key: '5iYundnZV0CW2fIdBafMhShEWx0mOep8SFVKXmCUi8oEAqABSZ' 
    // API key，访问 https://www.tumblr.com/oauth/apps 以获取
  },
  download: {
    path: 'download', // 默认下载路径，不存在则生成
    thread: 4  // 默认并行下载数，可被覆盖
  },
  proxy: {
    protocol: 'http',  // 代理服务协议
    host: '127.0.0.1',  // 代理服务器地址
    port: 1080,  // 代理服务器接口
    timeout: 5000
  }  
}

module.exports = config;