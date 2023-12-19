import { useState, useEffect } from "react";

import GridPostList from "../ui/GridPostList";
import Loader from "../ui/Loader";
import { useUserContext } from "@/context/AuthContext";

const SearchResults = ({ posts, isSearchFetching }) => {
  const { user } = useUserContext();

  if (isSearchFetching) {
    return (
      <div className="mt-20 w-full flex-center">
        <Loader />
      </div>
    );
  }

  if (posts && posts.length > 0) {
    return <GridPostList posts={posts} />;
  }

  return (
    <div className="flex justify-center items-center mt-6 text-light-4">
      No post found
    </div>
  );
};

export default SearchResults;
