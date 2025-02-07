import type { Job } from "@prisma/client"
import React from "react"
import JobTableCell from "./JobTableCell"
import { StatusDropdownData } from "utils/constants"

type Props = {
  row: Job
}

const JobTableRowNotEdit = ({ row }: Props) => {
  return Object.keys(row).map((field, index) => {
    const typedField = field as keyof Job
    if (
      ["id", "job_description", "createdAt", "applicant_id"].includes(typedField)
    ) {
      return null
    }

    return (
      <JobTableCell
      key={index}
      field={typedField}
      cellValue={row[typedField]}
      />
    )
  })
}

export default JobTableRowNotEdit
