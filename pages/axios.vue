<template>
  <section class='container'>
    <div>
      <Logo />
      <h1 class='title'>{{title}}</h1>
      <p class='subtitle' v-html="message">no message</p>
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
      <table class="axiosTable">
        <tr>
          <th>名前</th>
          <td><input type='text' class="input in-success inputAxios" v-model="username"></td>
        </tr>
        <tr>
          <th>メール</th>
          <td><input type='text' class="input in-success inputAxios" v-model="email"></td>
        </tr>
        <tr>
          <th>年齢</th>
          <td><input type='text' class="input in-success inputAxios" v-model="age"></td>
        </tr>
        <tr>
          <th>電話</th>
          <td><input type='text' class="input in-success inputAxios" v-model="tel"></td>
        </tr>
        <tr>
          <td colspan="2">
            <button @click="addData" class="button--green">登録</button>
          </td>
        </tr>
      </table>
      <table class='axiosTable'>
        <tr>
          <th>メール</th>
          <td><input type='text' class="input in-success inputAxios" v-model="email"></td>
        </tr>
        <tr>
          <td colspan="2"><button @click="delData" class='button--grey'>削除</button></td>
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
      persons: {},
      username: '',
      email: '',
      age: 0,
      tel: ''
    }
  },
  methods: {
    addData: function () {
      let add_url = url + '/' + this.email + '.json'
      let data = {
        'name': this.username,
        'age': this.age,
        'tel': this.tel
      }
      axios.put(add_url, data).then((res) => {
        this.email = ''
        this.username = ''
        this.age = 0
        this.tel = ''
        this.getData()
      })
    },
    getData: function () {
      axios.get(url + '.json').then((res) => {
        this.message = '全データの取得'
        this.persons = res.data
      }).catch((error) => {
        this.message = 'ERROR!'
        this.persons = {}
      })
    },
    delData: function () {
      let del_url = url + '/' + this.email + '.json'
      axios.delete(del_url).then((res) => {
        this.message = 'データを削除'
        this.email = ''
        this.getData()
      })
    }
  },
  created: function () {
    this.getData()
  }
}
</script>