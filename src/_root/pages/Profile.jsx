import { useGetCurrentUser, useGetProfileInfo } from "@/lib/react-query/queries.js";
import Loader from "@/components/ui/Loader";
import ProfileHeader from "@/components/ui/ProfileHeader";
import ProfilePost from "@/components/ui/ProfilePost";
import { useParams } from "react-router-dom"

const Profile = () => {
  const { id } = useParams()
  
  const {
    data: user,
    isPending: isLoadingUser,
    isFetching
  } = useGetProfileInfo(id);

  if (isLoadingUser) {
    return <div className="w-full">
      <Loader />
    </div>
  }

  return (
    <div className="w-full">
      <ProfileHeader user={user} />
      <ProfilePost user={user} />
    </div>
  );
};

export default Profile;