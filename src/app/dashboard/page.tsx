"use client"

import JobTable from "features/job-table/JobTable"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import { useLoadingStore } from "providers/Store"
import { useEffect } from "react"
function Dashboard() {
  const { data: session, status } = useSession()

  const {setIsLoading} = useLoadingStore()
  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [status, setIsLoading]) 
  // TODO: Add loading spinner
  if (status === "loading") {
    return null // Prevent redirecting prematurely
  }

  if (!session) {
    redirect("/login")
    return null
  }
 
  return <JobTable userData={session} />
}

export default Dashboard
