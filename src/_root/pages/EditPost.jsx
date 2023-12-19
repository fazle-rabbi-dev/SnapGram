import {
  useState, useEffect
} from 'react';
import { useParams } from "react-router-dom"

import PostForm from "@/components/forms/PostForm"
import Loader from "@/components/ui/Loader"
import { useGetPostById } from "@/lib/react-query/queries";

const CreatePost = () => {
  const { postid } = useParams()
  
  const { data: post, isPending: isLoadingPost } = useGetPostById(postid)
  
  if(isLoadingPost){
    return <div className="w-full mt-20 flex justify-center items-center">
      <Loader />
    </div>
  }
  
  return (
    <section className="w-full px-6 mt-6">
      <div className="flex items-center gap-2">
        <img className="w-8 h-8" src="/assets/icons/add-post.svg" alt="Add Post" />
        <h2 className="h3-bold md:h2-bold">Update post</h2>
      </div>
      <PostForm action="Update" post={post} />
    </section>
  )
}

export default CreatePost
