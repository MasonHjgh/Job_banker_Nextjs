import React from "react";
import NavBar from "./NavBar";
import UserAvatar from "./userAvatar";

const Header = () => {
  return (
    <div className=" bg-purple">
      <UserAvatar/>
      <NavBar />
    </div>
  );
};

export default Header;
