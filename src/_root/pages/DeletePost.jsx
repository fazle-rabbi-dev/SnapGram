import { useParams, useNavigate } from "react-router-dom"
import { useDeletePost, useGetPostById } from "@/lib/react-query/queries"
import Loader from "@/components/ui/Loader"
import showToast from "@/lib/helpers/showToast"

const DeletePost = () => {
  const { postid } = useParams()
  const navigate = useNavigate()
  
  const { mutateAsync: deletePost, isPending: isDeletingPost } = useDeletePost()
  const { data: post, isPending: isLoadingPost } = useGetPostById(postid)
  
  const handleDeletePost = async () => {
    console.log("Deleting...")
    if(!isLoadingPost && post){
      const res = await deletePost({
        postId: post.$id,
        imageId: post.imageId
      })
      
      console.log(res && res.status)
      
      if(res && res.status === 'Ok'){
        showToast("Post deleted")
        navigate("/");
      }else{
        showToast("Post deletion failed", 'error')
      }
    }
  }
  
  if(isLoadingPost){
    return <div className="w-full mt-20">
      <Loader />
    </div>
  }
  
  return (
    <div className="">
      <p className="bg-dark-4 p-2">
        Are you sure you want to delete this post? This action cannot be undone.
      </p>
      <div className="mt-2 flex gap-3 items-center">
        <button disabled={isDeletingPost} className="pr-1 py-1 rounded" type="button">
          Cancel 🚫
        </button>
        <button disabled={isDeletingPost} onClick={handleDeletePost} className="bg-rose-600 p-1 rounded" type="button">
          {
            isDeletingPost ? "Deleting..." : "Delete Post 🗑️"
          }
        </button>
      </div>
    </div>
  )
}

export default DeletePost
