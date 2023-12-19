import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PostStats from "@/components/shared/PostStats";
import { useUserContext } from "@/context/AuthContext";

const GridPostList = ({ posts }) => {
  const { user } = useUserContext();

  return (
    <div className="mt-2 w-full">
      <ul className="space-y-6">
        {posts?.map(post => (
          <li key={post.$id} className="w-full relative">
            <Link to={`/post/${post.$id}`}>
              <img
                className="w-full h-full rounded-2xl"
                src={post.imageUrl}
                alt=""
              />
              <div className="w-full px-4 bottom-2 absolute">
                <PostStats post={post} userId={user?.id} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GridPostList;
