import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

import FileUploader from "@/components/shared/FileUploader";
import { createPostValidationSchema } from "@/lib/helpers/utils";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queries";
import showToast from "@/lib/helpers/showToast";
import Loader from "@/components/ui/Loader";

const PostForm = ({ post, action }) => {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(createPostValidationSchema),
    defaultValues: {
      caption: post?.caption || "",
      location: post?.location || "",
      tags: post?.tags.join(",") || [],
      file: post?.file || []
    }
  });

  const { user } = useUserContext();
  const navigate = useNavigate();

  // Queries
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost();

  const onSubmit = async data => {
    if(action === 'Update'){
      updatePost({
        ...data,
        imageUrl: post?.imageUrl,
        imageId: post?.imageId,
        postId: post?.$id
      })
      showToast("Post updated successfuly")
      navigate("/")
      return;
    }
    
    const newPost = await createPost({
      ...data,
      userId: user.id
    });

    console.log({ isLoadingCreate });

    if (!newPost) {
      return showToast("Post creation failed.Try again", "error");
    }

    showToast("Posted successfuly");
    navigate("/");
  };

  return (
    <form className="pb-20" onSubmit={handleSubmit(onSubmit)}>
      <div className="my-4">
        <label className="shad-form_label block mb-2" htmlFor="caption">
          Caption
        </label>
        <input
          className="shad-input w-full"
          type="text"
          id="caption"
          {...register("caption")}
        />
        {errors.caption && (
          <span className="text-sm text-rose-300">
            {errors.caption.message}
          </span>
        )}
      </div>
      <div className="">
        <FileUploader mediaUrl={post?.imageUrl} setValue={setValue} />
        {errors.file && (
          <span className="text-sm text-rose-300">{errors.file.message}</span>
        )}
      </div>
      <div className="my-4">
        <label className="shad-form_label block mb-2" htmlFor="location">
          Location
        </label>
        <input
          className="shad-input w-full"
          type="text"
          id="location"
          {...register("location")}
        />
      </div>
      <div className="my-4">
        <label className="shad-form_label block mb-2" htmlFor="tags">
          Tags
        </label>
        <input
          placeholder="Nature, Romance"
          className="shad-input w-full"
          type="text"
          id="tags"
          {...register("tags")}
        />
        {errors.tags && (
          <span className="text-sm text-rose-300">{errors.tags.message}</span>
        )}
      </div>
      <button disabled={isLoadingCreate} className="submit_btn" type="submit">
        {isLoadingCreate ? (
          <div className="flex justify-center items-center gap-2">
            <Loader />
            Creating...
          </div>
        ) : (
          "Post"
        )}
      </button>
    </form>
  );
};

export default PostForm;
