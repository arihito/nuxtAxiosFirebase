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
const url   = "https://nuxttest20190223.firebaseio.com/person"

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
      let mail_url = url + '/' + this.mail + '.json'
      axios.get(mail_url).then((res) => {
        this.message = '検索メール：' + this.mail
        console.log(res.data)
        //＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊ Objectのキーにthisが使えない
        // this.persons = { this.mail : res.data } 
      }).catch((error) => {
        this.message = "Error!"
      })
    }
  },
  asyncData: async function () {
      let result = await axios.get(url + ".json")
      return { persons: result.data }
  }
}
</script>