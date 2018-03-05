export const state = () => ({
  user: null
})

export const mutations = {
  set_user(store, user) {
    store.user = user
  },
  reset_user(store) {
    store.user = null
  }
}

export const actions = {
  //fetch({ commit }, payload) {
  // return api.auth
  //   .me()
  //   .then(response => {
  //     commit("set_user", response.data.result)
  //     return response
  //   })
  //   .catch(error => {
  //     commit("reset_user")
  //     return error
  //   })
  //},
  // login({ commit }, user) {
  //   commit("set_user", user)
  //   return user
  // },
  reset({ commit }) {
    commit("reset_user")
    return Promise.resolve()
  }
}
