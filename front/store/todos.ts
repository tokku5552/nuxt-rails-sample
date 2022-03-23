// import axios from 'axios';
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
// export default {
//     namespaced: true,
//     state,
//     actions,
//     mutations,
// }