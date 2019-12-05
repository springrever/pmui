'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG:'"dev"',
  // 自己的ip地址
  // API_BASEURL: '"http://172.17.140.162:8090"'
  // 正式地址
  API_BASEURL: '"http://172.16.90.177:8080"'
  // 测试地址
  // API_BASEURL: '"http://172.16.90.177:8082"'
})
