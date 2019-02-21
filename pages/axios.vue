<template>
  <section class='container'>
    <div>
      <Logo />
      <h1 class='title'>{{title}}</h1>
      <p class='subtitle' v-html="message">no message</p>
      <pre>{{ asyncPreview }}</pre>
      <div class='right'>
        <router-link to='/' class="button--grey">Go to Top</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '../components/Logo.vue'
const axios = require('axios')

export default {
  components: {
    Logo
  },
  data: function() {
    return {
      title: 'Axios',
      message: 'axios test'
    }
  },
  asyncData: async function () {
      let result = await axios.get("/README.md")
      return { asyncPreview: result.data }
  }
}
</script>