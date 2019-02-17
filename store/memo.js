export const state = () => ({
  memo: [],
  page: 0
})

export const mutations = {

  // 記事情報を配列の手前に追加
  insert: function (state, obj) {
    let d = new Date()
    let w = d.getDay()
    const wja = ['日', '月', '火', '水', '木', '金', '土']
    let fmt = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日(' + wja[w] + ') ' + d.getHours() + '時' + d.getMinutes() + '分'
    state.memo.unshift({
      title: obj.title,
      content: obj.content,
      created: fmt
    })
  },

  // 現在の表示ページを追加
  set_page: function (state, p) {
    state.page = p
  },

  // 記事件数分の中で選択したタイトル/本文/日付と等しい記事を削除
  remove: function (state, obj) {
    let num = 0
    for (let i = 0; i < state.memo.length; i++) {
      const ob = state.memo[i]
      if (ob.title == obj.title && ob.content == obj.content && ob.created == obj.created) {
        alert('remove it ! --' + ob.title)
        // 指定したインデックス番号の配列要素を1件削除
        state.memo.splice(i, 1)
        return
      }
    }
  }
}