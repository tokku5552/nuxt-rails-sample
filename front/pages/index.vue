<template>
  <section class="container">
    <h1 class=".title">Todoリスト</h1>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="10">
          <v-text-field
            v-model="content"
            placeholder="タスクを入力してください"
            outlined
          />
        </v-col>
        <v-col cols="12" md="2">
          <v-btn elevation="2" @click="fetch"> 追加 </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-btn elevation="2">全て</v-btn>
    <v-btn elevation="2">作業前</v-btn>
    <v-btn elevation="2">作業中</v-btn>
    <v-btn elevation="2">完了</v-btn>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">タスク</th>
            <th class="text-left">登録日時</th>
            <th class="text-left">状態</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in todos" :key="index">
            <td>{{ item.content }}</td>
            <!-- <td>{{ item.created }}</td> -->
            <td>
              <v-btn elevation="2">{{ item.state }}</v-btn>
            </td>
            <td><v-btn elevation="2">削除</v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      todos: [],
      content: '',
    }
  },
  // computed: {
  //   ...mapState({
  //     todos: (state) => state.todos,
  //   }),
  // },
  methods: {
    // insert: function () {
    //   if (this.content != '') {
    //     this.$store.commit('insert', { content: this.content })
    //     this.content = ''
    //   }
    // },
    // ...mapActions({
    //   fetch: 'index/fetch',
    // }),
    fetch() {
      this.$axios.$get('/v1/todos').then((res) => {
        console.log(res)
        this.todos = res
      })
    },
  },
  mounted: function () {
    this.fetch()
  },
}
</script>
