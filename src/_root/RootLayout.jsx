import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import TopBar from "@/components/shared/TopBar";
import BottomBar from "@/components/shared/BottomBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import Loader from "@/components/ui/Loader";
import { useUserContext } from "@/context/AuthContext"

const RootLayout = () => {
  const { user, isLoading: isAuthLoading } = useUserContext();
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!isAuthLoading && !user){
      navigate("/sign-in")
    }
  },[isAuthLoading]);
  
  /*if(isAuthLoading || !user){
    return <div className="w-full h-screen flex justify-center items-center">
      <Loader />
    </div>
  }*/
  
  
  return (
    <div className="w-full md:flex mt-16">
      <TopBar />
      <LeftSideBar />
      <section className="h-full flex flex-1 pb-20 px-6 py-4 md:ml-[25%] md:px-10">
        <Outlet />
      </section>
      <BottomBar />
    </div>
  );
};

export default RootLayout;
