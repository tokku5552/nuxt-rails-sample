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
          <v-btn elevation="2" @click="add"> 追加 </v-btn>
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
              <v-btn elevation="2" @click="update(item)">{{
                item.state
              }}</v-btn>
            </td>
            <td><v-btn elevation="2" @click="remove(item)">削除</v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </section>
</template>

<script lang='ts'>
import { mapState, mapActions } from 'vuex'
import { Todo, State } from '../types/todo'

export default {
  data(): {
    todos: Todo[]
    content: string
  } {
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
    fetch() {
      this.$axios.$get('/v1/todos').then((res) => {
        console.log(res)
        this.todos = res as Todo[]
      })
    },
    add() {
      const todo: Todo = {
        content: this.content,
        state: State.planning,
      }
      this.$axios
        .$post('/v1/todos', {
          todo: todo,
        })
        .then((res) => {
          console.log(res)
          this.fetch()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    update(todo: Todo) {
      switch (todo.state) {
        case State.planning:
          todo.state = State.doing
          break
        case State.doing:
          todo.state = State.done
          break
        case State.done:
          todo.state = State.planning
          break
        default:
          console.log('State error')
          return
      }
      this.$axios
        .$put(`/v1/todos/${todo.id}`, {
          todo: todo,
        })
        .then((res) => {
          console.log(res)
          this.fetch()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    remove(todo: Todo) {
      this.$axios
        .$delete(`/v1/todos/${todo.id}`, {
          todo: todo,
        })
        .then((res) => {
          console.log(res)
          this.fetch()
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  mounted: function () {
    this.fetch()
  },
}
</script>
