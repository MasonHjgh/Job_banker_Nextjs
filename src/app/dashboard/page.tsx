"use client"

import JobTable from "features/job-table/JobTable"
import { useSession } from "next-auth/react"
function Dashboard() {
  const { data: session } = useSession()

  return session === undefined || session === null ? null : (
    <JobTable userData={session} />
  )
}

export default Dashboard
