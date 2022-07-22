
export const state = () => ({
  counter: 0
})



export const getters = {
  getCounter(state : any) {
    return state.counter
  }
}

export const mutations = {
  increment(state : any) {
    state.counter++
  }
}

export const actions = {
  async fetchCounter(state : any) {
    // make request
    const res = { data: 10 };
    state.counter = res.data;
    return res.data;
  }
}

