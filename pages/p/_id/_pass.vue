<template>
  <section class='container'>
    <div>
      <Logo />
      <h1 class='title'>{{title}}</h1>
      <p class='subtitle' v-html="message">no message</p>
      <div class='right'>
        <router-link to='/' class="button--grey">Go to Top</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '../../../components/Logo.vue'

export default {
  components: {
    Logo
  },
  validate ({ params }) {
    if (params.id == undefined || params.pass == undefined) {
      return false
    } else {
      return true
    }
  },
  data: function() {
    return {
      title: 'Login'
    }
  },
  computed: {
    message: function () {
      let id   = this.$route.params.id
      let pass = this.$route.params.pass
      console.log('***********result:' + id + pass + '***********')
      return 'ID:' + id + ' / PASSWORD:' + pass
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
