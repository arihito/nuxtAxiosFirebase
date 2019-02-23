<template>
  <section class='container'>
    <div>
      <Logo />
      <h1 class='title'>{{title}}</h1>
      <p class='subtitle' v-html="message">no message</p>
      <p class="flex">
        <input type='text' class="input in-success inputAxios" v-model="mail">
        <button @click="getSearch" class="button--green">検索</button>
      </p>
      <table class="axiosTable">
        <tr>
          <th>名前</th>
          <th>年齢</th>
          <th>メール</th>
        </tr>
        <tr v-for="(person,key) in persons" :key="key">
          <td>{{person.name}}</td>
          <td>{{person.age}}</td>
          <td>{{key}}</td>
        </tr>
      </table> 
      <div class='right'>
        <router-link to='/' class="button--grey">Go to Top</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '../components/Logo.vue'
const axios = require('axios')
const url   = "https://nuxttest20190223.firebaseio.com/person.json?orderBy=%22age%22"

export default {
  components: {
    Logo
  },
  data: function() {
    return {
      title: 'Axios',
      message: 'axios test',
      mail: "",
      persons: {}
    }
  },
  methods: {
    getSearch: function () {
      let range = this.mail.split(',')
      let age_url = url + "&startAt=" + range[0] + "&endAt=" + range[1]
      axios.get(age_url).then((res) => {
        this.message = '範囲：' + range[0] + ' < age < ' + range[1]
        console.log(res.data)
        this.persons = res.data
      }).catch((error) => {
        this.message = "Error!"
        this.persons = {}
      })
    }
  }
}
</script>