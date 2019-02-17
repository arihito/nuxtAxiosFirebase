<template>
  <section class='container'>
    <div>
      <Logo />
      <h1 class="title">{{pageTitle}}</h1>
      <p class="subtitle">{{message}}</p>
      <table>
        <tr>
          <th class="level-item">
            <h3 class="thTitle">タイトル</h3>
          </th>
          <td class="field">
            <div class="control">
              <input type="text" v-model="title" @focus="set_flg" class="input is-success" name="title">
            </div>
          </td>
          <td>  
            <button @click="find" class="button--grey6">検索</button>
          </td>
        </tr>
        <tr>
          <th class="level-item">
            <h3 class="thTitle">メモ内容</h3>
          </th>
          <td class="field">
            <div class="control">
              <textarea v-model="content" class="textarea is-success" name='content' cols='50' rows='5'></textarea>
            </div>
          </td>
          <td>
            <button @click="insert" class="button--grey6">保存</button><br>
            <transition name="del">
              <button v-if="sel_flg != false" @click="remove" class="button--grey6">削除</button>
            </transition>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>      
            <ul class="archive">
              <li v-for="item in page_items" :key="item.title">
                <span @click="select(item)"><strong>{{ item.title }}</strong> :{{item.created}}</span>
              </li>
            </ul>
            <div class='nav'>
              <span @click="prev" class="button--grey6">＜ 新しい一覧</span>
              <router-link to="/" class="button--green">Go to Top</router-link>      
              <span @click="next" class="button--grey6">過去の一覧 ＞</span>
            </div>
          </td>
          <td></td>
        </tr>
      </table>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data: function () {
    return {
      pageTitle: 'Memo',
      message: 'これはメモを追加するページです',
      title: '',
      content: '',
      num_per_page: 7,
      find_flg: false,
      sel_flg: false
    }
  },
  computed: {
    memo: function () {
      return this.$store.state.memo.memo
    },
    page_items: function () {
      if (this.find_flg) {
        let arr = []
        let data = this.$store.state.memo.memo
        data.forEach(element => {
          if (element.title.toLowerCase().indexOf(this.title.toLowerCase()) >= 0) {
            arr.push(element)
          }
        })
        return arr
      }
      else if (this.sel_flg != false) {
        return [this.sel_flg]
      }
      else {
        return this.$store.state.memo.memo.slice(
          this.num_per_page * this.$store.state.memo.page,
          this.num_per_page * (this.$store.state.memo.page + 1)
        )
      }
    },
    page: {
      get: function () {
        return this.$store.state.memo.page
      },
      set: function (p) {
        let pg = p > (this.$store.state.memo.memo.length -1) / this.num_per_page ? Math.ceil((this.$store.state.memo.memo.length -1) / this.num_per_page) - 1 : p
        pg = pg < 0 ? 0 : pg
        this.$store.commit('memo/set_page', pg)
      }
    }
  },
  methods: {
    set_flg: function () {
      if (this.find_flg || this.sel_flg != false) {
        this.find_flg = false
        this.sel_flg  = false
        this.title    = ''
        this.content  = ''
      }
    },
    insert: function () {
      this.$store.commit('memo/insert',{title:this.title, content:this.content})
      this.title = ''
      this.content = ''
    },
    select: function (item) {
      this.find_flg = false
      this.set_flg  = item
      this.title    = item.title
      this.content  = item.content
    },
    remove: function () {
      if (this.set_flg == false) {
        return
      }
      else {
        this.$store.commit('memo/remove', this.sel_flg)
        this.set_flg()
      }
    },
    find: function () {
      this.sel_flg  = false
      this.find_flg = true
    },
    next: function () {
      this.page++
    },
    prev: function () {
      this.page--
    }
  },
  created: function () {
    this.$store.commit('memo/set_page',0)
  }
}
</script>

