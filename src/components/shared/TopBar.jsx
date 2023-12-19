import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";
import Loader from "@/components/ui/Loader"
import { useSignOutAccount } from "@/lib/react-query/queries"

const TopBar = () => {
  const { setIsAuthenticated, setUser, isLoading, user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate()
  
  useEffect(() => {
    if(isSuccess){
      setUser(null)
      setIsAuthenticated(false)
      navigate("/sign-in")
    }
  },[isSuccess]);
  
  return (
    <section className="bg-dark-1 shadow shadow-dark-4 fixed z-50 top-0 h-14 w-full flex justify-between items-center py-4 px-6 md:hidden">
      <div className="">
        <Link to="/">
          <img className="" src="/assets/images/logo.svg" alt="Logo" />
        </Link>
      </div>
    
      {
        isLoading ? <div className="">
          <Loader />
        </div> : (
            <div className="flex items-center gap-2">
              <button onClick={signOut}>
                <img className="" src="/assets/icons/logout.svg" alt="Logout" />
              </button>
              <Link to={`/profile/${user?.id}`} className="flex-center gap-3">
                <img
                  src={user?.imageUrl || "/assets/icons/profile-placeholder.svg"}
                  alt="profile"
                  className="h-8 w-8 rounded-full"
                />
              </Link>
            </div>
          )
      }
    </section>
  );
};

export default TopBar;
