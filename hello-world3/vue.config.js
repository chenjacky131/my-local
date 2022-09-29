const webpack = require('webpack')
module.exports = {
  devServer:{
    proxy:{
      '/api/':{
        target: 'http://39.106.100.236',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}