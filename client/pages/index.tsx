import type { GetServerSideProps } from 'next'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch , useAppSelector} from "../store/hooks"
import {postAdd, postRemove} from '../store/postSlice'
interface PostInterface {
  id: number
  title: string
  content: string
  author: {
    id: number
    userId: number
    email: string
    fullName: string
  }
}
interface PropsType {
  isLogin: boolean
  posts:  {
    status : string,
    postCount : number,
    posts : PostInterface[]}
}

const Home = (props : PropsType) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const posts = useAppSelector(state => state.posts.posts) 
  useEffect(() => {
    dispatch(postAdd(props.posts.posts as PostInterface[]))
    
  }, [])

  const deleteHandler = (id : number) => {
    setIsLoading(true)
    try {
      axios.delete(
        `/api/v1/posts/delete/${id}`
      )
      dispatch(postRemove(id))
        setIsLoading(false)

    }catch (err) {
      console.log(err)
                setIsLoading(false)

    
     }

    
  }

  return (
    <div className="d-flex p-4  mt-4 gap-4">
      {posts.length != 0 &&
        posts.map((post) => {
          return (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => router.push(`/posts/${post.id}`)}
              key={post.id}
              className="border  p-2 rounded-2 border-dark shadow-lg "
            >
              <h1>{post.title}</h1>
              <p>{post.content}</p>
              <p>{post.author.fullName}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation
                  deleteHandler(post.id)
                }}
                className="btn btn-danger"
              >
                <span
                  className={`${
                    isLoading ? "spinner-border spinner-border-sm" : ""
                  }`}
                  role="nothing"
                  aria-hidden="true"
                ></span>
                Delete
              </button>
            </div>
          )
        })}

      {posts.length == 0 && <div className=' text-center fs-4 ' >No posts</div>}
    </div>
  )
}
//
export default Home

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  
  if (!req.cookies.session) {
    return {
      redirect: {
        destination: "/login",
      },
      props: { isLogin: false, posts : [] },
    }
  }

  const { data } = await axios.get(
    "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/v1/posts/all",
    {
      headers: req.headers as any,
    }
  )


  return {
    props: { isLogin: true, posts: data || [] },
  }
}

