"use client"

import JobTable from "features/job-table/JobTable"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import { useLoadingStore } from "providers/Store"
import { useEffect } from "react"
function Dashboard() {
  const { data: session, status } = useSession()

  const { setIsLoading } = useLoadingStore()
  // useEffect(() => {
  //   if (status === "loading") {
  //     setIsLoading(true)
  //   } else {
  //     setTimeout(() => {
  //       setIsLoading(false)
  //     }, 2000)
  //   }
  // }, [status, setIsLoading])

  

  return session === undefined || session === null ? null : (
    <JobTable userData={session} />
  )
}

export default Dashboard
