interface UserData {
  id: string,
  fullName : string,
  email: string,

}


export const state = () => ({
  user: null as UserData | null,
  isLoggedIn: false,
})



export const getters = {
  getUser(state: { user: UserData, isLoggedIn : boolean }) {
    return { ...state.user, isLoggedIn: state.isLoggedIn }
  },
}

export const mutations = {
  setUser(state: { user: UserData, isLoggedIn : boolean }, user: UserData) {
    state.user = user
    state.isLoggedIn = true
  },

  setLogin (state: { user: UserData, isLoggedIn : boolean }, isLoggedIn: boolean) {
    state.isLoggedIn = isLoggedIn
  },

  logout(state: { user: UserData | null, isLoggedIn : boolean }) {
    state.user = null
    state.isLoggedIn = false

  }
}

export const actions = {
  async nuxtServerInit({ commit } : any, { req } : any) {
    // console.log(req.headers.cookie)
    //write a request to check to current user
    // if user is logged in, set the user in the store



    if (req.headers?.cookie) {
       try {
         const response = await fetch('http://blogs.com/api/v1/auth/test', {
           method: 'GET',
           headers: {
             cookie: req.headers.cookie,
           },
         })
         const user = await response.json()
         commit('setUser', user)
       } catch (error) {
         console.log(error)
       }

      // console.log(req.currentUser)

    }
  },
}

