const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '//localhost:2000',
  devServer:{
    port: 2000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    configureWebpack: {
      output: {
        libraryTarget: 'umd',
        library: 'micro-vue-demo'
      }
    }
  }
})
