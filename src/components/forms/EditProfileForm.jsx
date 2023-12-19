import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProfileValidationSchema } from "@/lib/helpers/utils";
import { useUpdateProfile } from "@/lib/react-query/queries"
import showToast from "@/lib/helpers/showToast"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "@/context/AuthContext"

const EditProfileForm = ({ user }) => {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(updateProfileValidationSchema),
    defaultValues: {
      name: "" || user?.name,
      bio: "" || user?.bio,
      file: []
    }
  });
  
  const navigate = useNavigate()
  const { mutateAsync: updateProfile, isPending: isUpdating } = useUpdateProfile()
  const { isAuthenticated, user: loggedInUser, setUser} = useUserContext()
  
  const handleUpdate = async (data) => {
    const updatedDoc = await updateProfile({
      ...data,
      id: user.$id,
      imageUrl: user.imageUrl,
      imageId: user.imageId
    })
    if(updatedDoc){
      showToast("Updated successful")
      setUser({
        ...loggedInUser,
        imageUrl: updatedDoc.imageUrl
      })
      navigate(`/profile/${user.$id}`)
    }else{
      showToast("Update failed")
    }
  };
  
  return (
    <form onSubmit={handleSubmit(handleUpdate)} className="">
      <div className="my-2">
        <label htmlFor="" className="mb-2 shad-form_label">
          Name
        </label>
        <input
          className="shad-input w-full"
          type="text"
          id="name"
          {...register("name")}
        />
        {errors?.name && (
          <p className="text-sm text-light-4">{errors?.name?.message}</p>
        )}
      </div>
      <div className="my-2">
        <label htmlFor="" className="mb-2">
          Bio
        </label>
        <input
          className="shad-input w-full"
          type="text"
          id="bio"
          {...register("bio")}
        />
        {errors?.bio && (
          <p className="text-sm text-light-4">{errors?.bio?.message}</p>
        )}
      </div>
      <div className="my-2">
        <label htmlFor="" className="mb-2">
          Profile pic
        </label>
        <input
          className="shad-input w-full"
          type="file"
          id="file"
          {...register("file")}
        />
        {errors?.file && (
          <p className="text-sm text-light-4">{errors?.file?.message}</p>
        )}
      </div>
      <button disabled={isUpdating} className="submit_btn" type="submit">
        {
          isUpdating ? (
              <div className="w-full flex justify-center items-center gap-2">
                Saving...
              </div>
            ) : (
                <span>Save</span>
              )
        }
      </button>
    </form>
  );
};

export default EditProfileForm;
