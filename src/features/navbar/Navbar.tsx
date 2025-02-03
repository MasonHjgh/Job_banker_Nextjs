import React from "react"
import NavBarItem from "features/navbar/NavbarItem"
import UserMenu from "features/user-menu/UserMenu"

const navItemList = [
  { address: "/", text: "home" },
  { address: "/", text: "about" },
  { address: "/", text: "contact us" },
]
const NavBar = () => {

  return (
    <div className="navbar bg-base-300 flex justify-between items-center px-4">
    {/* Left Spacer for Proper Centering */}
    <div className="flex-1"></div>
  
    {/* Centered Navigation Items */}
    <div className="navbar-center flex">
      <ul className="menu menu-horizontal px-1">
        {navItemList.map((item, index) => (
          <NavBarItem key={index} item={item} />
        ))}
      </ul>
    </div>
  
    {/* User Menu on the Right */}
    <div className="flex-1 flex justify-end">
      <UserMenu />
    </div>
  </div>
  
  )
}

export default NavBar
