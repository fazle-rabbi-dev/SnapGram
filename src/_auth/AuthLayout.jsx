import { useState, useEffect } from "react";
import SigninForm from "./forms/SigninForm";
import SignupForm from "./forms/SignupForm";
import { Outlet, Navigate } from "react-router-dom";

import Loader from "@/components/ui/Loader"
import { useUserContext } from "@/context/AuthContext"


const AuthLayout = () => {
  const { isAuthenticated, isLoading: isAuthLoading } = useUserContext()
  
  console.log(isAuthLoading)
  
  if(isAuthLoading){
    return <div className="mt-2 w-full">
      <Loader />
    </div>
  }
  
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex justify-center items-center md:justify-between">
            <Outlet />
            <img
              className="hidden md:block w-1/2 h-screen object-cover bg-no-repeat"
              src="/assets/images/side-img.svg"
              alt="Logo"
            />
          </section>
        </>
      )}
    </>
  );
};

export default AuthLayout;
