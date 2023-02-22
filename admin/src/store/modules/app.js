import * as types from '../mutation-types'

const state = {
  error: ''
}

// getters
const getters = {
  error: state => state.error
}

// mutations
const mutations = {
  [types.ERROR] (state, { error }) {
    state.error = error
  }
}

export default {
  state,
  getters,
  mutations
}
