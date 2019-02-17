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
      title: 'Hello',
      message: 'This is message.',
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

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
  padding-left: 10px;
}

.links {
  width: 500px;
  padding-top: 15px;
}
p {
  padding-top: 5px;
  font-size: 20px;
}
button {
  font-size: 16px;
}
.button--grey {
  margin-left: 0px;
  margin-right: 5px;
}
pre {
  padding: 10px;
  font-size: 18px;
  background-color: #efefef;
}
.flex {
  padding-top: 15px;
  display: flex;
  justify-content: center;
}
</style>
