import React from "react";
import NavBarItem from "features/navbar/NavbarItem";


const navItemList = [
  { address: "/", text: "home" },
  { address: "/", text: "about" },
  { address: "/", text: "contact us" },
];
const NavBar = () => {

  return (
    <div className="navbar bg-base-300">
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItemList.map((item, index) => (
            <NavBarItem key={index} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
