module.exports = {
  devServer:{
    proxy:{
      '/api':{
        target: 'https://mini.jackchen7003.top',
        changeOrigin: true,
        pathRewrite: {
          '^/api':''
        }
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'development' ? '':'/dist'
}