"use client"
import React from "react"
import { signOut, useSession } from "next-auth/react"

export default function UserMenu() {
      const { data: session } = useSession()
    
    if (!session) {
      return null
    }

  return (
    <div className="pr-5">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1">
          Account
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-22 p-2 shadow"
        >
          <li>
            <a>Profile</a>
          </li>
          <li>
          <button onClick={() => signOut()}>Sign Out</button>
          </li>
        </ul>
      </div>
    </div>
  )
}
