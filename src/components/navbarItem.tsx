import React from "react";
import Link from "next/link";

const NavBarItem = (props) => {
  return (
    <li>
      <Link href={props.item.address}>{props.item.text}</Link>
    </li>
  );
};

export default NavBarItem;
