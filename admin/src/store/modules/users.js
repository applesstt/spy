import users from '../../api/users'
import * as types from '../mutation-types'

const LIST_USERS = 'users/list'

// initial state
const state = {
  users: []
}

// getters
const getters = {
  users: state => state.users
}

// actions
const actions = {
  getUsers ({ commit }) {
    users.list(users => {
      commit(LIST_USERS, { users })
    }, (error) => {
      commit(types.ERROR, { error })
    })
  }
}

// mutations
const mutations = {
  [LIST_USERS] (state, { users }) {
    state.users = users
  },

  [types.ADD_TO_CART] (state, { id }) {
    state.users.find(p => p.id === id).inventory--
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
