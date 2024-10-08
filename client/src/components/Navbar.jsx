import React from 'react'
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import AdminUser from './AdminUser';

const Navbar = () => {
   const { user } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
  
  return (
    <>
      <div className="flex justify-between items-center px-4 py-3 2xl:py-4 sticky z-10 top-0 bg-[#f3f4f6] ">
        <div className="flex gap-4">
          <button
            onClick={() => dispatch(setOpenSidebar(true))}
            className="text-2xl text-gray-500 block md:hidden"
          >
            ☰
          </button>
          <div className="w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-white">
            <MdOutlineSearch className="text-gray-500 text-xl" />
            <input
              type="text"
              placeholder="Search...."
              className="flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800"
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <AdminUser />
        </div>
      </div>
    </>
  );
}

export default Navbar