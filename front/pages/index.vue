<template>
  <section class="container">
    <h1 class=".title">Todoリスト</h1>
    <v-row>
      <v-input v-model="content" placeholder="タスクを入力してください" />
      <v-btn elevation="2" @click="insert"> 追加 </v-btn>
    </v-row>

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
            <td>{{ item.created }}</td>
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
import { mapState } from 'vuex'

export default {
  data() {
    return {
      content: '',
    }
  },
  computed: {
    ...mapState(['todos']),
  },
  methods: {
    insert: function () {
      if (this.content != '') {
        this.$store.commit('insert', { content: this.content })
        this.content = ''
      }
    },
  },
}
</script>
