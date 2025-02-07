"use client"

import React, { useEffect, useState } from "react"
import JobTableRow from "./JobTableRow"
import type { Job } from "@prisma/client"
import { useJobStore, useLoadingStore } from "providers/Store"
import { request } from "utils/api"
import JobTableHeader from "./JobTableHeader"
import { JobTableTitles } from "./jobTable.constants" 

export default function JobTable() {
  const [data, setData] = useState<Job[]>([])
  const { setIsLoading } = useLoadingStore()
  const { refreshJobs } = useJobStore()

  const fetchData = async (signal?: AbortSignal) => {
    setIsLoading(true)
    try {
      const newdata = await request<Job[]>({
        url: `/jobs`,
        method: "GET",
        signal: signal,
      })
      setData(newdata.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    fetchData(controller.signal)
    return () => {
      controller.abort()
    }
  }, [refreshJobs])

  return (
    // Table

    <div className="text-sm w-full overflow-x-auto max-h-[500px] bg-white shadow-md rounded-lg">
      {/*Table Header */}
      <div className="min-w-max border border-gray-300 ">
        <JobTableHeader titles={JobTableTitles} />
        {/* Table Body */}
        {/* Table Row  */}
        {data.map((element, key) => {
          return <JobTableRow row={element} key={key} />
        })}
      </div>
    </div>
  )
}
