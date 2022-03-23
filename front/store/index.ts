
import { createStore } from 'vuex';
import todos from './todos'
import { ActionContext } from 'vuex';
import axios from 'axios';
import { Context } from '@nuxt/types';

export default createStore({
    modules: {
        todos,
    }
})

// type Todo = {
//     content: string
//     state: string
// }

// type State = {
//     todos: Todo[]
// }

// export const state = () => ({
//     todos: []
// })

// export const mutations = {
//     setTodos(state: State, todos: Todo[]) {
//         state.todos = todos
//     }
// }

// export const actions = {
//     async fetch(context: any) {
//         const res: Todo[] = await axios.get('/todos')
//         context.commit("setTodos", res)
//     }
// }

// const createStore = () => {
//     return new Vuex.Store({
//         state: () => ({
//             todos: [
//                 // { content: 'テスト', created: '2020-04-30 17:00', state: '作業前' },
//                 // { content: 'コーディング', created: '2020-04-30 16:00', state: '作業中' },
//                 // { content: '環境構築', created: '2020-04-30 15:30', state: '完了' }
//             ]
//         }),
//         mutations: {
//             insert: (state: State, obj) => {
//                 var d = new Date();
//                 var fmt = d.getFullYear()
//                     + '-' + ('00' + (d.getMonth() + 1)).slice(-2)
//                     + '-' + ('00' + d.getDate()).slice(-2)
//                     + ' ' + ('00' + d.getHours()).slice(-2)
//                     + ':' + ('00' + d.getMinutes()).slice(-2);
//                 state.todos.unshift({
//                     content: obj.content,
//                     state: '作業前'
//                 })
//             }
//         },
//         actions: {
//             fetch: () => ({
//                 // const { $axios } = useContext()
//                 const todos = await this.$axios.$get('/todos');
//                 // commit('SET_IP', todos);
//                 this.state.todos = todos;
//             })
//         },

//     })
// }

// export default createStore;