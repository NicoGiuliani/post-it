"use client"

import axios from "axios"
import CreatePost from "./components/AddPost"
import { useQuery } from "@tanstack/react-query"
import Post from "./components/Posts"
import { PostType } from "./types/Posts"
import postcss from "postcss"

const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts")
  return response.data
}

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ['posts']
  })
  if (error) return error
  if (isLoading) return "Loading..."
  console.log(data)
  return (
    <main>
      <CreatePost />
      {data?.map((post) =>
        <Post
          comments={post.Comment}
          id={post.id}
          key={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title} />
      )}
    </main>
  )
}
