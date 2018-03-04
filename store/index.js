import Vuex from "vuex"

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: {}
    }
  })
}

export default createStore
