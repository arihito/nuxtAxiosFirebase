<template>
  <section class='container'>
    <div>
      <Logo />
      <h1 class='title'>{{title}}</h1>
      <p class='subtitle' v-html="message">no message</p>
      <table>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Image</th>
        </tr>
        <tr v-for="photo in photos" :key="photo.id">
          <td>{{photo.id}}</td>
          <td>{{photo.title}}</td>
          <td><img :src='photo.thumbnailUrl' width="30"></td>
        </tr>
      </table> 
      <div class='right'>
        <router-link to='/' class="button--greyiii">Go to Top</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '../components/Logo.vue'
const axios = require('axios')
const url   = "http://jsonplaceholder.typicode.com/photos"

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
      let result = await axios.get(url)
      return { photos: result.data }
  }
}
</script>

<style>
  tr:nth-child(even) {
    background-color: #eee;
  }
</style>
