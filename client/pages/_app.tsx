import "../styles/globals.css"
import "bootstrap/dist/css/bootstrap.min.css"
// import '../scss/custom.scss'
import type { AppProps } from "next/app"
import Header from "../components/base/Header"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
