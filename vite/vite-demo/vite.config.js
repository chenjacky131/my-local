import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import commonjs from "rollup-plugin-commonjs";
import externalGlobals from "rollup-plugin-external-globals";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    rollupOptions: {
      external: ['vue','dayjs','lodash'],
      plugins: [
        commonjs(),
        externalGlobals({
          vue: 'Vue',
          dayjs: 'dayjs',
          lodash: '_'
        })
        /*
          externalGlobals({
            jquery: "$"
          })          
          上面的配置把
          import jq from "jquery";          
          console.log(jq(".test"));
          转换成
          console.log($(".test"));
        */
      ]
    }
  }
})
