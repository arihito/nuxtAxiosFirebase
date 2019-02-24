<template>
  <section class='container'>
    <div>
      <Logo />
      <h1 class='title'>{{title}}</h1>
      <h2 class='subtitle'>{{message}}</h2>
      <p class='subtext' v-html="params">no message</p>
      <div class='right'>
        <div class='login button--grey' @click="doLogin">Login: {{user_name}}</div>
        <router-link to='/' class="button--grey">Go to Top</router-link>
      </div>
      <div v-if="logined">
        <table class="axiosTable">
          <tr>
            <th colspan="2">メッセージ</th>
          </tr>
          <tr>
            <td><input type="text" v-model="msg" class="input in-success inputAxios"></td>
            <td><button @click="add" class="button--grey btn">投稿</button></td>
          </tr>
        </table>
        <ul>
          <li v-for="(data, key) in persons" :key="data.id" class="messageList">
            <span class='msg'>{{data.msg}}</span>
            <span class='user'>{{key}}: {{data.user}}</span><br><span class="posted">[{{data.posted}}]</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '../../../components/Logo.vue'
import firebase from "firebase"
const axios = require('axios')

const config = {
  apiKey: "AIzaSyBMj6GngSgraFFbATIxuywN0FTVMbjxhGI",
  authDomain: "nuxtaxios20190224.firebaseapp.com",
  databaseURL: "https://nuxtaxios20190224.firebaseio.com",
  projectId: "nuxtaxios20190224",
  storageBucket: "nuxtaxios20190224.appspot.com",
  messagingSenderId: "763369105851"
}
firebase.initializeApp(config)

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
      title: 'OAuth Message App',
      message: 'Google Authentication Provider',
      user_name: 'GoogleAuth',
      logined: true,
      msg: '',
      page: 0,
      num_per_page: 10,
      persons: {}
    }
  },
  methods: {
    login: function () {
      const provider = new firebase.auth.GoogleAuthProvider()
      let self = this
      firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log(result.user)
        self.user = result.user
        self.user_name = result.user.displayName
        self.message = 'Logined by Google ID!'
        const db = firebase.database()
        let ref = db.ref('person')
        ref.orderByKey().limitToLast(self.num_per_page).on('value', function (snapshot) {
          if (firebase.auth().currentUser != null) {
            let arr = []
            let data = snapshot.val()
            for (let item in data) {
              arr.unshift(data[item])
            }
            console.log(arr)
            self.persons = arr
          }
          else {
            self.persons = {}
          }
        })
      })
    },
    logout: function () {
      firebase.auth().signOut()
      this.user_name = ''
      this.persons = {}
      this.message = 'Logouted by Google ID...'
    },
    doLogin: function () {
      if (firebase.auth().currentUser == null) {
        this.login()
      }
      else {
        this.logout()
      }
    },
    add: function () {
      if (firebase.auth().currentUser == null) {
        alert("It's possible posting only logined user")
        return
      }
      const db = firebase.database()
      const user = firebase.auth().currentUser
      console.log(user)
      let ref = db.ref('person')
      let self = this
      let d = new Date()
      let dstr = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      console.log(dstr)
      let id = d.getTime()
      let data = {
        msg: this.msg,
        user: user.displayName,
        posted: dstr
      }
      firebase.database().ref('person/' + id).set(data)
      this.msg = ''
      this.message = 'Posted!'
    }
  },
  computed: {
    params: function () {
      let id   = this.$route.params.id
      let pass = this.$route.params.pass
      console.log('***********result:' + id + pass + '***********')
      return 'Page Access ID:' + id + ' / PASSWORD:' + pass
    } 
  },
  created: function () {
    if (firebase.auth().currentUser == null) {
      this.login()
    }
    console.log(firebase.auth().currentUser)
  }
}
</script>