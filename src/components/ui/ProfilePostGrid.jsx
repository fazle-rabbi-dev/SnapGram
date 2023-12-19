import { Link } from "react-router-dom";

const ProfilePostGrid = ({ posts, type }) => {
  if (type === "save_post") {
    return (
      <div className="">
        {posts?.length === 0 && (
          <div className="w-full mt-10 text-light-4 text-center">
            <p>You have not yet saved any posts.</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2">
          {posts?.map(({ post }) => (
            <Link key={post?.$id} to={`/post/${post?.$id}`}>
              <img className="" src={post?.imageUrl} alt={post?.caption} />
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {posts?.length === 0 && (
        <div className="w-full mt-10 text-light-4 text-center">
          <p>You have not yet created any posts.</p>
        </div>
      )}
      <div className="grid grid-cols-3 gap-2">
        {posts?.map(post => (
          <Link key={post?.$id} to={`/post/${post?.$id}`}>
            <img className="" src={post?.imageUrl} alt="" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfilePostGrid;
