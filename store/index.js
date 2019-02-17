import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: function () {
      return {
        counter : 0,
        message : 'counter number.'
      }
    },
    mutations: {
      count: function (state, payload) {
        state.counter += payload
      },
      say: function (state, payload) {
        state.message = payload
      },
      reset: function (state) {
        state.counter = 0;
        state.message = 'reset now ...'
      }
    },
    actions: {
      rand: function (context) {
        const n = Math.floor(Math.random() * 10)
        context.commit('count', n)
        context.commit('say', "add:" + n + "!")
      }
    }
  })
}

export default createStore