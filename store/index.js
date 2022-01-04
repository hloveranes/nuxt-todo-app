export const strict = false;

export const state = () => ({
  todos: [],
})

export const getters = {
  getAllTodos: state => {
    return state.todos
  },
}

// link not provided just for code reference
export const actions = {
  fetchTodos: ({state, commit}, payload) => {
    this.$axios.$get('/todos')
    .then(res => {
      commit('commitTodos', res);
    })
    .catch(error => {
    })
  },
  updateTodos: ({state, commit}, payload) => {
    commit('commitTodos', payload);
  }
}

export const mutations = {
  commitResetTodo: () => {
    state.todos = [];
  },
  commitTodos: (state, payload) => {
    state.todos = payload;
  }
}

