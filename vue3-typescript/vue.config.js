const { resolve } = require("path");

module.exports = {
  productionSourceMap: false,

  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8888",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  css: {
    // css预设器配置项
    loaderOptions: {
      scss: {
        prependData: `@import "./src/assets/style/mixin.scss";`
      }
    }
  }
};
