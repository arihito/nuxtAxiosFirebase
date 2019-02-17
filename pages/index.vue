<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">{{title}}</h1>
      <h2 class="subtitle">{{message}}</h2>
      <pre>{{now}}</pre>
      <div class="links">
        <router-link to="/memo" 
          class="button--green">
          Memo</router-link>
        <router-link to="/p/test/abcd" 
          class="button--green">
          Show ID/PASS</router-link>
        <a href='https://ja.nuxtjs.org/guide' target="_blank" class="button--green">Nuxt.js Guide</a>
      </div>
      <div class='links'>
        <pre>{{$store.state.rand.counter}}</pre>
        <div class="flex">
          <button @click="doAction" 
            class="button--grey">
            clicked +1: {{$store.state.rand.counter}}</button>
          <button @click="$store.commit('rand/rand')"
            class="button--grey">Random {{$store.state.rand.message}}</button>
          <button @click="$store.commit('rand/reset')" 
            class="button--grey">Reset</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data: function() {
    return {
      title: 'Nuxt Test',
      message: 'This is Vuex',
      now: 'wait...'
    }
  },
  created: function() {
    setInterval(() => {
      let d = new Date()
      this.now = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
    },1000)
  },
  methods: {
    doAction: function() {
      this.$store.commit('rand/increment')
    }
  }
}
</script>