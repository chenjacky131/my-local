import Bus from '@/bus'
export default {
  install: (app, options) => {
    app.config.globalProperties.$bus = Bus
  }
}