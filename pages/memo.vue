<template>
  <section class='container'>
    <div>
      <Logo />
      <h1 class="title">{{title}}</h1>
      <p class="subtitle">{{message}}</p>
      <router-link to="/" class="button--green">Go to Top</router-link>
      <a href='https://ja.nuxtjs.org/guide' target="_blank" class="button--green">Nuxt.js Guide</a>
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
      title: 'Memo',
      message: 'これはメモを追加するページです'
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
}
</style>
