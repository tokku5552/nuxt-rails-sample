import Vuex from 'vuex';

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            todos: [
                { content: 'テスト', created: '2020-04-30 17:00', state: '作業前' },
                { content: 'コーディング', created: '2020-04-30 16:00', state: '作業中' },
                { content: '環境構築', created: '2020-04-30 15:30', state: '完了' }
            ]
        }),
        mutations: {
            insert: (state, obj) => {
                var d = new Date();
                var fmt = d.getFullYear()
                    + '-' + ('00' + (d.getMonth() + 1)).slice(-2)
                    + '-' + ('00' + d.getDate()).slice(-2)
                    + ' ' + ('00' + d.getHours()).slice(-2)
                    + ':' + ('00' + d.getMinutes()).slice(-2);
                state.todos.unshift({
                    content: obj.content,
                    created: fmt,
                    state: '作業前'
                })
            }
        },
    })
}

export default createStore;