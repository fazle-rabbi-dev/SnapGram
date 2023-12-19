import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, Navigate } from "react-router-dom";

import { useGetPostById } from "@/lib/react-query/queries";
import { multiFormatDateString } from "@/lib/helpers/utils";
import Loader from "@/components/ui/Loader";
import PostStats from "@/components/shared/PostStats";
import { useUserContext } from "@/context/AuthContext";

const PostDetails = () => {
  const { postid } = useParams();
  const navigate = useNavigate();

  const { data: post, isPending: isLoadingPost } = useGetPostById(postid);
  const { user } = useUserContext();

  if (isLoadingPost) {
    return (
      <div className="w-full mt-20 flex-center">
        <Loader />
      </div>
    );
  }

  if (!isLoadingPost && !post) {
    return (
      <div className="">
        <p>No post found</p>
        <Navigate to="/" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="py-4 px-2 md:px-6 rounded border-[.5px] border-blue-800 shadow shadow-white md:flex md:gap-4">
        <div className="md:w-[80%]">
          <img
            className="w-full h-[300px] rounded-2xl"
            src={post?.imageUrl}
            alt="Image"
          />
        </div>

        <div className="md:flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center ">
              <div className="mt-4 flex items-center gap-2">
                <Link to={`/profile/${post?.creator?.$id}`}>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={post?.creator?.imageUrl}
                    alt=""
                  />
                </Link>
                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="text-gray-700 flex items-center gap-2">
                    <p className="subtle-semibold lg:small-regular">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    {" - "}
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              {post?.creator?.$id === user?.id && (
                <div className="flex items-center gap-2">
                  <Link to={`/update-post/${post?.$id}`}>
                    <img
                      className="w-5 h-5"
                      src="/assets/icons/edit.svg"
                      alt=""
                    />
                  </Link>

                  <Link to={`/delete-post/${post?.$id}`}>
                    <img
                      className="w-6 h-6"
                      src="/assets/icons/delete.svg"
                      alt=""
                    />
                  </Link>
                </div>
              )}
            </div>

            <hr className="my-2 border-0 h-[.4px] bg-gray-900" />

            <div className="mt-2">
              <p className="text-sm text-gray-300">{post?.caption}</p>
              <ul className="mt-2 flex items-center gap-2">
                {post?.tags.map((tag, index) => (
                  <li key={index} className="text-sm text-blue-800">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {post && <PostStats post={post} userId={user?.id} />}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
