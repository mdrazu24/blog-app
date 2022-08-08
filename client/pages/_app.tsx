import "../styles/globals.css"
import "bootstrap/dist/css/bootstrap.min.css"
import '../scss/custom.scss'
import type { AppProps } from "next/app"
import Header from "../components/base/Header"
import ProgressBar from "@badrap/bar-of-progress"
import Router from "next/router"
import Link from 'next/link'

import {
  QueryClient,
  QueryClientProvider
} from "react-query"
//  import { ReactQueryDevtools } from "react-query/devtools"
  import 'react-toastify/dist/ReactToastify.css';

import StoreProvide from '../store/index'
// import { useEffect } from "react"
// import {changeState} from '../store/userSlice'
// import { store } from "../store/index"
  import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  const client = new QueryClient()
  const progress = new ProgressBar({
    size: 1,
    color: "#e53935",
    className: "bar-of-progress",
    delay: 100,
  })


    // useEffect(() => {
    //   store.dispatch(changeState({ isLogin: pageProps.isLogin }))
    // }, [pageProps.isLogin])

  Router.events.on("routeChangeStart", progress.start)
  Router.events.on("routeChangeComplete", progress.finish)
  Router.events.on("routeChangeError", progress.finish)

  return (
    <StoreProvide>
      <QueryClientProvider client={client}>
        <Header />
        <Component {...pageProps} />
        <ToastContainer position="bottom-right" hideProgressBar={true} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </StoreProvide>
  )
}

export default MyApp


