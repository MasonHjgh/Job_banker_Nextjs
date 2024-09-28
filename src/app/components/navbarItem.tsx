import React from "react"
import Link from "next/link"

type Props = {
  item: {
    address: string
    text: string
  }
}

function NavBarItem({ item }: Props) {
  return (
    <li>
      <Link href={item.address}>{item.text}</Link>
    </li>
  )
}

export default NavBarItem
