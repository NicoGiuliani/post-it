"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"

export default function CreatePost() {
  const [title, setTitle] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)

  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/posts/addPost", { title }),
    {
      onError: (error: any) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, {})
        }
        setIsDisabled(false)
      },
      onSuccess: (data) => {
        toast.success("New post has been added")
        setTitle('')
        setIsDisabled(false)
      }
    })

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisabled(true)
    mutate(title)
  }

  return (
    <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Whaddup?"
          className="p-4 text-lg rounded-md my-2 bg-gray-200"
          name="title"
          value={title}></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-gray-700"}`}>{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-md disabled:opacity-25"
          type="submit">Create a post</button>
      </div>
    </form>
  )
}