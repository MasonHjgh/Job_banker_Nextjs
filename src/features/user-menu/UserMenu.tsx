import React from "react"
import { signOut,auth } from "utils/auth"

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  )
}

export default async function UserMenu() {
    const session = await auth()
    
    if (!session) {
      return null
    }

  return (
    <div className="ml-auto pr-5">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1">
          Account
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a>Profile</a>
          </li>
          <li>
            <SignOut />
          </li>
        </ul>
      </div>
    </div>
  )
}
