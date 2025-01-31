"use client"

import JobTable from "features/job-table/JobTable"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"

function Dashboard() {
  const { data: session, status } = useSession()


  // TODO: Add loading spinner
  if (status === "loading") {
    return <div>Loading...</div> // Prevent redirecting prematurely
  }

  if (!session) {
    redirect("/login")
    return null
  }

  return <JobTable userData={session} />
}

export default Dashboard
