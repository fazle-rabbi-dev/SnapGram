import {
  useState, useEffect
} from 'react';

import PostForm from "@/components/forms/PostForm"

const CreatePost = () => {
  return (
    <section className="w-full">
      <div className="flex items-center gap-2">
        <img className="w-8 h-8" src="/assets/icons/add-post.svg" alt="Add Post" />
        <h2 className="h3-bold md:h2-bold">Create post</h2>
      </div>
      <PostForm />
    </section>
  )
}

export default CreatePost
