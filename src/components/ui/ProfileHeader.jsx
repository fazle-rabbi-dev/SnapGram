import { Link } from "react-router-dom"
import { useUserContext } from "@/context/AuthContext"

const ProfileHeader = ({ user }) => {
  const { user: loggedInUser, isLoading } = useUserContext()
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'User Profile',
          text: 'Check out this user profile!',
          url: window.location.href,
        });
        console.log('Successfully shared');
      } catch (error) {
        console.error('Error sharing:', error.message);
      }
    } else {
      console.log('Web Share API not supported');
    }
  };
  
  return (
    <div className="">
      <div className="flex justify-between">
        <div className="w-1/5">
          <img
            className="rounded-full w-16 h-16"
            src={user?.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="img"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex gap-2 items-center">
            <div className="flex flex-col items-center justify-self-center">
              <p>{user?.posts.length || 0}</p>
              <p className="text-sm">Posts</p>
            </div>
            <div className="flex flex-col items-center justify-self-center">
              <p>0</p>
              <p className="text-sm">Followers</p>
            </div>
            <div className="flex flex-col items-center justify-self-center">
              <p>0</p>
              <p className="text-sm">Following</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* User Info */}
      <div className="mt-2">
        <h2 className="font-bold">{user?.name}</h2>
        <p className="break-all text-light-2 text-sm">{user?.bio}</p>
        
        {/* User Actions */}
        <div className="mt-2 flex gap-2">
          { user?.$id === loggedInUser?.id && (
              <Link to={`/update-profile/${user?.$id}`}>
                <button className="p-2 rounded bg-dark-4 text-white" type="button">
                  Edit profile
                </button>
              </Link>
            )
          }
          <button onClick={handleShare} className="p-2 rounded bg-dark-4 text-white" type="button">
            Share profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
