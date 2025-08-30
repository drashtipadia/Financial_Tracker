import React, { useState } from "react";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import SideMenu from "./SideMenu";
const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className="flex gap-5 bg-white border-b border-gray-200/50 backdrop-blur-2xl py-4 px-7 sticky top-0 z-30">
      <button
        className="block lg:hidden text-black"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <AiOutlineClose className="text-2xl" />
        ) : (
          <AiOutlineMenu size={30} className="text-2xl" />
        )}
      </button>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
        Financial <span className="font-bold">Tracker</span>
      </h1>
      {openSideMenu && (
        <div className="fixed top-[64px] -ml-7 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
