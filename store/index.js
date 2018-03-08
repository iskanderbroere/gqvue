import me from "~/apollo/queries/me.gql"
import { hasCookie } from "~/apollo/client-configs/default.js"

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
  nuxtServerInit({ dispatch }, { req }) {
    return new Promise((resolve, reject) => {
      if (!hasCookie(req)) {
        return
      }
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

    return client
      .query({
        query: me
      })
      .then(res => {
        commit("set_user", res.data.me)
      })
      .catch(e => {
        console.error(e)
      })
  }
  // reset({ commit }) {
  //   commit("reset_user")
  //   return Promise.resolve()
  // }
}
