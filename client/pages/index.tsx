import type { GetServerSideProps, NextPage } from 'next'
// import { useAppSelector } from "../store/hooks"

const Home: NextPage = (props) => {
  //   const isLogin = useAppSelector(state => state.users.isLogin)
  // console.log(isLogin)
  return (
    <div>
      <div className="h1">This will be the home page</div>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // console.log(req.cookies.session)
  if (req.cookies.session) {
    return {
      props: { isLogin: true },
    }
  }
  return {
    props: { isLogin: false },
  }
}

