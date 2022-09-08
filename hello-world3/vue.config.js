const webpack = require('webpack')
module.exports = {
  devServer:{
    proxy:{
      '/api/':{
        target: 'https://www.yiketianqi.com/',
        changeOrigin: true
      }
    }
  }
}