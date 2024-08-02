import React from 'react'
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";
import logo from "../assets/Nirvasian-Logo.png";

import { Toaster, toast } from "react-hot-toast";
import { useLogoutMutation } from "../redux/slices/authApiSlice";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";


const linkData = [
  {
    label: "Dashboard",
    link:  "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Clients",
    link: "clients",
    icon: <FaUsers />,
  },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [logoutUser] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      localStorage.removeItem("userInfo");
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      dispatch(logout());
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (err) {
      console.error("Error during logout:", err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const path = location.pathname.split("/")[1];
  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);
  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };
  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#fdba74]",
          path === el.link.split("/")[0] ? "bg-orange-500 text-neutral-100" : ""
        )}
      >
        {el.icon}
        <span className="hover:text-[#fff]">{el.label}</span>
      </Link>
    );
  };
   

  return (
    <>
      <div className="w-full  h-full flex flex-col gap-6 p-5">
        <div className="flex justify-center">
          <img src={logo} alt="logo" className="w-40" />
        </div>
        <div className="flex-1 flex flex-col gap-y-5 py-8">
          <div className="flex-1 flex flex-col gap-y-5 py-8">
            {sidebarLinks.map((link) => (
              <NavLink el={link} key={link.label} />
            ))}
          </div>
        </div>
        <div className="">
          <button
            className="w-full flex gap-2 p-2 items-center text-lg text-gray-800"
            onClick={logoutHandler}
          >
            <MdLogout />
            <span>Logout</span>
          </button>
        </div>
      </div>
      <Toaster />
    </>
  );
  
}

export default Sidebar