export default function ({ $axios, redirect, store }) {

  $axios.onError((error) => {
        const res = error.response
        console.log(res)
    if (
      res?.status == 401 ||
      res?.data.message.indexOf('invalid token') == 0 ||
      res?.data.message.indexOf(
        "You're not authorized"
      ) == 0 ||
      (res.data.message.indexOf('jwt expired') == 0 &&
        res.config &&
        !res.config.__isRetryRequest)
    ) {

      localStorage.removeItem('user')
      store.commit('logout')

      redirect('/login')

    }
  })
}
