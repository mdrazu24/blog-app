import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAppSelector } from '../store/hooks'

type Props = {}

const AddPost = (props: Props) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const author = useAppSelector(state => state.users.user)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const createPostHandler = async () => {
        setIsLoading(true)
        try {
            const post = {
              title,
              content,
              author: {
                userId : author!.id,
                ...author,
              },
            }

            const { data } = await axios.post("/api/v1/posts/create", post, {withCredentials : true})
            console.log(data)
            setIsLoading(false)
            router.push("/")
            
        } catch (error) {
            console.log(error)
                        setIsLoading(false)

        }
            
        
        
    } 
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div style={{ maxWidth: "700px", width: "650px" }} className="p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            createPostHandler()
          }}
          className="d-flex flex-column"
        >
          <label htmlFor="title" className="form-label">
            Title :{" "}
          </label>
          <input
            type="title"
            id="title"
            className="form-control"
            name="title"
            placeholder="Title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="password" className="form-label">
            Content :{" "}
          </label>
          <textarea
            id="content"
            className="form-control"
            name="content"
            placeholder="Describe you post here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit" className="btn mt-2 btn-primary">
            {" "}
            <span
              className={`${
                isLoading ? "spinner-border spinner-border-sm" : ""
              }`}
              role="nothing"
              aria-hidden="true"
            ></span>
            Submit{" "}
          </button>
        </form>
      </div>
    </div>
  )

}

export default AddPost

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  if (!req.cookies.session) {
    return {
      redirect: {
        destination: "/login",
      },
      props: { isLogin: false },
    }
  }

  

  return {
    props: { isLogin: true },
  }
}
