import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: function () {
      return {
        message: 'counter number.',
        counter: 0
      }
    },
    mutations: {
      count: function (state, payload) {
        state.message = payload.message
        state.counter += payload.add
      },
      reset: function (state) {
        state.counter = 0
      }
    }
  })
}

export default createStore