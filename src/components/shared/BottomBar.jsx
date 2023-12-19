import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { bottombarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import Loader from "@/components/ui/Loader"

const BottomBar = () => {
  const { isLoading, user } = useUserContext();
  const { pathname } = useLocation();

  return (
    <section className="py-2 md:hidden fixed bottom-0 w-full bg-dark-2">
      <div className="">
        <ul className="flex justify-between px-4">
          {bottombarLinks.map(link => {
            const isActiveLink = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`hover:bg-primary-500 rounded group bottombar-link ${
                  isActiveLink && "bg-primary-500"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex flex-col  items-center p-2"
                >
                  <img
                    className={`group-hover:invert-white ${
                      isActiveLink && "invert-white"
                    }`}
                    src={link.imgURL}
                    alt={link.label}
                  />
                  <p className="text-sm">
                    {link.label}
                  </p>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default BottomBar;
