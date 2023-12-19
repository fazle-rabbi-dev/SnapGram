import { useState, useEffect } from "react";

import Loader from "@/components/ui/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts, useGetPosts } from "@/lib/react-query/queries";
import { useInView } from "react-intersection-observer";

const Home = () => {
  // const { data: posts, isPending: isLoadingPost } = useGetRecentPosts();
  const {
    data: posts,
    isPending: isLoadingPost,
    fetchNextPage,
    hasNextPage
  } = useGetPosts();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="h3-bold md:h2-bold">Home Feed</h2>
      </div>
      {isLoadingPost ? (
        <div className="">
          <Loader />
        </div>
      ) : (
        <ul className="flex flex-col gap-6">
          {posts?.pages.map((item, index) =>
            item?.documents.map(post => (
              <PostCard key={post.caption} post={post} />
            ))
          )}
        </ul>
      )}

      {hasNextPage && (
        <div ref={ref} className="w-full flex-center my-4">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Home;
