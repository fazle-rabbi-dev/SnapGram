import { useState } from "react";
import ProfilePostGrid from "./ProfilePostGrid";

const ProfilePost = ({ user }) => {
  const [displaySavedPost, setDisplaySavedPost] = useState(false);
  
  return (
    <div className="w-full mt-2">
      <div className="mb-2 flex justify-between items-center">
        <button
          onClick={() => setDisplaySavedPost(false)}
          className={`w-1/2 text-center ${
            !displaySavedPost && "border-b-[1px] "
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => setDisplaySavedPost(true)}
          className={`w-1/2 text-center ${
            displaySavedPost && "border-b-[1px] "
          }`}
        >
          Saved
        </button>
      </div>
      

      
      {!displaySavedPost ? (
        <ProfilePostGrid posts={user?.posts} />
      ) : (
        <ProfilePostGrid posts={user?.save} type="save_post" />
      )}
    </div>
  );
};

export default ProfilePost;
