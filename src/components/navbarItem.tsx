import React from "react";
import Link from "next/link";

type ItemProps = {
  item: {
    address: string;
    text: string;
  };
};

const NavBarItem: React.FC<ItemProps> = ({ item }) => {
  return (
    <li>
      <Link href={item.address}>{item.text}</Link>
    </li>
  );
};

export default NavBarItem;
