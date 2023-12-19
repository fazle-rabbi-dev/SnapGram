import { useGetSavedPosts } from "@/lib/react-query/queries";
import Loader from "@/components/ui/Loader";
import SavedPost from "@/components/ui/SavedPost";
import { useUserContext } from "@/context/AuthContext"

const Saved = () => {
  const { user } = useUserContext()
  const { data, isPending: isLoadingPost, isFetching, isError, error } = useGetSavedPosts(user);
  
  if (isLoadingPost) {
    return <div className="w-full mt-20">
      <Loader />
    </div>
  }
  
  if(isError){
    return <h3>Error occured</h3>
  }
  
  return (
    <div className="w-full">
      <h1 className="h3-bold md:h2-bold">Saved Posts</h1>
      {
        data?.documents.length === 0 ? (
            <p className="mt-4 text-center text-light-3">
              No save post found
            </p>
          ) : (
            <SavedPost posts={data?.documents} />  
            )
      }
    </div>
  );
};

export default Saved;
