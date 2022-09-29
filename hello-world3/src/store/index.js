import { createStore } from 'vuex'

export default createStore({
  state: {
    token: ''
  },
  mutations: {
    SET_TOKEN(state, payload){
      state.token = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
