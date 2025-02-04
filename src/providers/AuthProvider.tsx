"use client"

import { useSession } from "next-auth/react"
import { redirect, usePathname } from "next/navigation"

import React, { useEffect } from "react"

type Props = {
  children: React.ReactNode
}

function AuthProvider({ children }: Props) {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  
  if (status === "loading") {
    return null
  }
  if(status === "unauthenticated" && pathname !== "/login") {
    redirect("/login")
    return null
  } else if (status === "authenticated" && pathname === "/login") {
    redirect("/dashboard")
    return null
  }

  return children
}

export default AuthProvider
