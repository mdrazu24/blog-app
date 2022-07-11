import axios from 'axios'
import { GetServerSideProps } from 'next'
import React, { useState } from 'react'

interface PostInterface {
  id?: number
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
  post: {
    status: string
    postCount: number
    post: PostInterface
  }
}

const SinglePost = (props: PropsType) => {
    const [post] = useState(props.post.post)

  return (
    <div>
      <div
        key={post.id}
        className=" p-2 rounded-2 border-dark "
      >
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <p>{post.author.fullName}</p>
      </div>
    </div>
  )
}

export default SinglePost


export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  if (!req.cookies.session) {
    return {
      redirect: {
        destination: "/login",
      },
      props: { isLogin: false, post: {} },
    }
  }

    const { data } = await axios.get(
      `http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/v1/posts/${params!.id}`,
      {
        headers: req.headers as any,
      }
    )

  return {
    props: { isLogin: true, post: data },
  }
}
