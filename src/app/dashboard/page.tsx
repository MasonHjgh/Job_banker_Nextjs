
import JobTable from "features/job-table/JobTable"
import { redirect } from "next/navigation"
import { auth } from "utils/auth"



async function Dashboard() {
  const session = await auth()
  
  if (!session) {
    redirect("/login")
  }

  return <JobTable />
}

export default Dashboard


