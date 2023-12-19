import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { multiFormatDateString } from "@/lib/helpers/utils";
import { useUserContext } from "@/context/AuthContext";
import PostStats from "@/components/shared/PostStats";

const PostCard = ({ post }) => {
  const { creator } = post;
  const { user } = useUserContext();

  return (
    <div className="bg-dark-3 border-[.5px] border-gray-600 px-2 py-4 rounded">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to={`/profile/${creator?.$id}`}>
            <img
              className="w-8 h-8 rounded-full"
              src={creator?.imageUrl}
              alt=""
            />
          </Link>
          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {creator.name}
            </p>
            <div className="text-gray-700 flex items-center gap-2">
              <p className="subtle-semibold lg:small-regular">
                {multiFormatDateString(post.$createdAt)}
              </p>
              {" - "}
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post?.$id}`}
          className={`${user?.id !== post?.creator.$id && "hidden"}`}
        >
          <img
            src={"/assets/icons/edit.svg"}
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </div>

      <Link to={`/post/${post.$id}`}>
        <p className="text-sm py-2">{post.caption.slice(0,50)}...</p>
        <ul className="flex flex-wrap gap-1 text-sm">
          {post.tags.map(tag => (
            <li key={tag} className="text-gray-700">
              #{tag}
            </li>
          ))}
        </ul>
        <img className="w-full h-[300px] md:h-[550px] mt-2 rounded rounded-2xl" src={post?.imageUrl} alt="" />
      </Link>
      <PostStats post={post} userId={user?.id} />
    </div>
  );
};

export default PostCard;
