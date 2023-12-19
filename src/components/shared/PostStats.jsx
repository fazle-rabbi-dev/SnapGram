import { useState, useEffect } from "react";

import {
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
  useGetCurrentUser
} from "@/lib/react-query/queries";
import Loader from "@/components/ui/Loader"

const PostStats = ({ post, userId }) => {
  const likesList = post.likesOfPost.map(user => user.$id)
  const [likes, setLikes] = useState(likesList)
  const [isSaved, setIsSaved] = useState(false);
  
  const { mutateAsync: likePost , isPending: isLiking} = useLikePost()
  const { mutateAsync: savePost , isPending: isSaving} = useSavePost()
  const { mutateAsync: deleteSavedPost , isPending: isDeleting} = useDeleteSavedPost()
  
  const { data: currentUser, isPending: isLoadingCurrentUser } = useGetCurrentUser()
  
  const savedPostRecord = currentUser?.save.find(
    (record) => record.post.$id === post.$id
  );
  
  useEffect(() => {
    setIsSaved(!!savedPostRecord)
  },[currentUser]);
  
  const handleLikePost = () => {
    let likesArray = [...likes];
    
    if(likesArray.includes(userId)){
      likesArray = likes.filter(id => id !== userId)
    }else{
      likesArray.push(userId)
    }
    
    setLikes(likesArray);
    // console.log(likesArray)
    likePost({ postId: post.$id, likesArray });
  }
  
  const handleSavePost = async (e) => {
    // e.stopPropagation() 
    if(savedPostRecord){
      await deleteSavedPost(savedPostRecord.$id)
      setIsSaved(false);
      return;
    }else{
      await savePost({ userId, postId: post.$id });
      setIsSaved(true)
    }
  }
  
  return (
    <div className="mt-2 flex justify-between">
      <div className="flex gap-1 items-center">
        
            <img onClick={handleLikePost} className="" src={likes.includes(userId) ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"} alt="Heart" />
        <p>
          {likes.length}
        </p>
      </div>
      
      <div className="">
        {
          isSaving || isDeleting ? <Loader /> :
          <img onClick={handleSavePost} className="" src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"} alt="Save" />
        }
      </div>
    </div>
  );
};

export default PostStats;
