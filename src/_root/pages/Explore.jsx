import { useState, useEffect } from "react";

import { useGetPosts, useSearchPosts } from "@/lib/react-query/queries";
import Loader from "@/components/ui/Loader";
import GridPostList from "@/components/ui/GridPostList";
import SearchResults from "@/components/ui/SearchResults";
import useDebounce from "@/hooks/useDebounce";
import { useInView } from 'react-intersection-observer';


const Explore = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedSearch);

  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  
  const { ref, inView } = useInView();
  
  
  useEffect(() => {
    if(inView && !searchValue){
      fetchNextPage();
    }
  },[inView]);
  
  if (!posts) {
    return (
      <div className="w-full mt-20 flex-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="">
        <h2 className="h3-bold md:h2-bold">Search Posts</h2>
        <div className="mt-2 relative">
          <img
            className="absolute left-2 bottom-3"
            src="/assets/icons/search.svg"
            alt="Search"
          />
          <input
            className="explore-search rounded w-full pl-10"
            type="text"
            name=""
            id=""
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6">
        <h2 className="h3-bold md:h2-bold">Popular Today</h2>
        <div className="">
          {searchValue
            ? <SearchResults posts={searchedPosts?.documents} isSearchFetching={isSearchFetching} />
            : posts?.pages.map((item, index) => (
                <GridPostList key={`page-${index}`} posts={item?.documents} />
              ))}
        </div>
      </div>
      {
        hasNextPage && !searchValue && (
            <div ref={ref} className="w-full flex-center my-4">
              <Loader />
            </div>
          )
      }
    </div>
  );
};

export default Explore;
