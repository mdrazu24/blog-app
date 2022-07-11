import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Post {
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

interface PostInfoType {
  posts: Post[]
}

// Define the initial state using that type
const initialState: PostInfoType = {
  posts: [
    
  ],
}

export const usersReducer = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdd: (state: typeof initialState, action: PayloadAction<Post[]>) => {
        const allData = [ ...action.payload!]
        
        //write a function to remove duplicates
        const uniqueData = allData.filter((item, index) => {
            return allData.indexOf(item) === index
        }
        )

      state.posts = uniqueData
    },
    postRemove: (state: typeof initialState, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id != action.payload!)
    },
  },
})

export const { postAdd, postRemove } = usersReducer.actions

export default usersReducer.reducer
