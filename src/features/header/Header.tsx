import React from "react";
import NavBar from "features/navbar/Navbar";
import UserAvatar from "features/user-avatar/UserAvatar";

const Header = () => {
  return (
    <div className=" bg-purple">
      <UserAvatar/>
      <NavBar />
    </div>
  );
};

export default Header;
