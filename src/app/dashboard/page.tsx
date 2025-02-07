"use client"

import JobTableActionBar from "features/job-table/job-table-action/JobTableActionBar"
import JobTable from "features/job-table/JobTable"
import { useSession } from "next-auth/react"
function Dashboard() {
  const { data: session } = useSession()

  return session === undefined || session === null ? null : (
    <>
      <JobTableActionBar />
      <JobTable />
    </>
  )
}

export default Dashboard
