import me from "~/apollo/queries/me.gql"

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
  nuxtServerInit({ dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch("fetch")
        .then(() => {
          resolve(true)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  fetch({ commit }) {
    let client = this.app.apolloProvider.defaultClient

    client
      .query({
        query: me
      })
      .then(res => {
        commit("set_user", res.data.me)
      })
  }
  // reset({ commit }) {
  //   commit("reset_user")
  //   return Promise.resolve()
  // }
}
