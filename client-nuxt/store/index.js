


export const state = () => ({
  user: null ,
  isLoggedIn: false,
})

export const getters = {
  getUser(state) {
    return { ...state.user, isLoggedIn: state.isLoggedIn }
  },
}

export const mutations = {
  setUser(state, user) {
    state.user = user
    state.isLoggedIn = true
  },

  setLogin(
    state,
    isLoggedIn
  ) {
    state.isLoggedIn = isLoggedIn
  },

  logout(state) {
    state.user = null
    state.isLoggedIn = false
  },
}

export const actions = {
  async nuxtServerInit({ dispatch }, {req} ) {

    // console.log(req.headers.cookie)
    //write a request to check to current user
    // if user is logged in, set the user in the store
    if (req?.headers?.cookie) {

      await dispatch('checkUser', req.headers.cookie)
    }
  },
  // nuxtClientInit({ commit }) {
  //   const userData = JSON.parse(localStorage.getItem('user') || '{}')
  //   if (userData.id) {
  //     commit('setUser', userData)
  //   }
  // },

  logOut({ commit }) {
    localStorage.removeItem('user')
    commit('logout')
  },
  async checkUser({ commit }, cookie) {
    try {
      const { data } = await this.$axios.get(
        'http://blogs.com/api/v1/auth/test',
        {
          headers: {
            cookie,
          },
        }
      )
        commit('setUser', data)
    } catch (error) {
      // console.log(error)
      console.log(error)
    }

  },
}
