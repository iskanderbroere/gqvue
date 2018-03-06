import me from "~/apollo/queries/me.gql"

export const state = () => ({
  user: null
})

export const mutations = {
  set_user(store, user) {
    console.log("user mutation", user)
    store.user = user
  },
  reset_user(store) {
    store.user = null
  }
}

export const actions = {
  nuxtServerInit({ dispatch }) {
    return new Promise(resolve => {
      dispatch("fetch")
        .then(() => {
          console.log("success")
          resolve(true)
        })
        .catch(error => {
          console.log("Provided token is invalid:", error)
          resolve(false)
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
  //const fakeUser = { name: "TESTIE", token: "1234" }
  //return fakeUser
  // return "api.auth
  //   .me()
  //   .then(response => {
  //     commit("set_user", response.data.result)
  //     return response
  //   })
  //   .catch(error => {
  //     commit("reset_user")
  //     return error
  //   })"
  // login({ commit }, user) {
  //   commit("set_user", user)
  //   return user
  // },
  // reset({ commit }) {
  //   commit("reset_user")
  //   return Promise.resolve()
  // }
}
