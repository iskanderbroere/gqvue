import cookie from "cookie"
import gql from "graphql-tag"

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
  nuxtServerInit({ dispatch }, context) {
    return new Promise(resolve => {
      const cookies = cookie.parse(context.req.headers.cookie || "")
      if (cookies.hasOwnProperty("bonas-access-token")) {
        console.log(cookies["bonas-access-token"])
        dispatch("fetch")
          .then(() => {
            resolve(true)
          })
          .catch(error => {
            console.log("Provided token is invalid:", error)
            // resetAuthToken()
            resolve(false)
          })
      } else {
        // resetAuthToken()
        resolve(false)
      }
    })
  },
  fetch({ commit }) {
    let client = this.app.apolloProvider.defaultClient
    debugger
    return client
      .query({
        query: gql`
          query me {
            me {
              id
              token
            }
          }
        `
      })
      .then(res => {
        const r = res
        console.log(r)
        commit("set_user", r)
        debugger
        return r
      })
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
  }
  // login({ commit }, user) {
  //   commit("set_user", user)
  //   return user
  // },
  // reset({ commit }) {
  //   commit("reset_user")
  //   return Promise.resolve()
  // }
}
