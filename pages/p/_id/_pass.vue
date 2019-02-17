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