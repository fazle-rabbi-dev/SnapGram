import { useParams } from "react-router-dom";
import { useGetCurrentUser } from "@/lib/react-query/queries";
import Loader from "@/components/ui/Loader";
import EditProfileForm from "@/components/forms/EditProfileForm";
import { useUserContext } from "@/context/AuthContext"

const UpdateProfile = () => {
  const { id } = useParams();

  const { data: user, isPending: isLoadingUser } = useGetCurrentUser();
  // const { user, isLoading } = useUserContext()
  
  if (isLoadingUser) {
    return (
      <div className="w-full ">
        <Loader />
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="h3-bold md:h2-bold">Update Profile</h1>
      
      {user && <EditProfileForm user={user} />}
    </div>
  );
};

export default UpdateProfile;
