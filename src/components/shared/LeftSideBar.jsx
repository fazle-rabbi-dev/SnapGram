import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import Loader from "@/components/ui/Loader"

const LeftSideBar = () => {
  const { isLoading, user } = useUserContext();
  const { pathname } = useLocation();

  return (
    <nav className="fixed bg-dark-2 hidden h-[100dvh] w-1/4 md:flex flex-col gap-6 justify-between overflow-auto">
      <div className="mt-4 px-2 w-full">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>

        {isLoading ? (
          <div className="mt-4">
            <Loader />
          </div>
        ) : (
          <Link to="/profile" className="mt-4 flex items-center gap-4">
            <img
              src={user?.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="logo"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user?.name}</p>
              <p className="small-regular text-light-3">@{user?.username}</p>
            </div>
          </Link>
        )}

        <ul className="mt-4 flex flex-col gap-6">
          {sidebarLinks.map(link => {
            const isActiveLink = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`group leftsidebar-link ${
                  isActiveLink && "bg-primary-500"
                }`}
              >
                <NavLink to={link.route} className="flex gap-6 items-center p-2">
                  <img
                    className={`group-hover:invert-white ${
                      isActiveLink && "invert-white"
                    }`}
                    src={link.imgURL}
                    alt={link.label}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      
      <button className="mx-2 p-2 mb-8 flex items-center gap-6">
        <img className="" src="/assets/icons/logout.svg" alt="Logout" />
        Logout
      </button>
    </nav>
  );
};

export default LeftSideBar;
