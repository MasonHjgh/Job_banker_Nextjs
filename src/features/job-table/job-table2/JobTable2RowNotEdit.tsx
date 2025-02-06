import type { Job } from "@prisma/client"
import React from "react"
import JobTable2Cell from "./JobTable2Cell"
import { StatusDropdownData } from "utils/constants"

type Props = {
  row: Job
}

const JobTable2RowNotEdit = ({ row }: Props) => {
  {
    return Object.keys(row).map((field, index) => {
      if (
        ["id", "job_description", "createdAt", "applicant_id"].includes(field)
      ) {
        return null
      }

      return (
        <JobTable2Cell
          cell={row[field as keyof Job]}
          key={index}
          fieldType={field}
        />
      )
    })
  }
}

export default JobTable2RowNotEdit
