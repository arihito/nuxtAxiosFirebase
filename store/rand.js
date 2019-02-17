export const state = () => ({
  counter: 0,
  message: 'counter number.'
})

export const mutations = {
  rand: function (state) {
    const n = Math.floor(Math.random() * 10)
    state.counter += n
    state.message = 'add: ' + n + '!'
  },
  increment: function (state) {
    state.counter++
  },
  reset: function (state) {
    state.counter = 0;
    state.message = 'reset now ...'
  }
}
