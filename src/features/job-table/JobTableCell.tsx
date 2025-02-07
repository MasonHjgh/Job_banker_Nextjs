import type { Job } from "@prisma/client"
import Link from "next/link"
import React from "react"
import { StatusDropdownData } from "utils/constants"
import { parseDateTime } from "utils/helper"

type Props = {
  field: keyof Job
  cellValue: Job[keyof Job]
}

export default function JobTableCell({ field, cellValue }: Props) {
  return (
    <div className="min-w-[75px] max-w-[100px] break-words p-2">
      {cellValue === null ? (
        false
      ) : (
          ["job_link", "resume_link", "cover_letter_link"] as Array<keyof Job>
        ).includes(field) ? (
        <Link href={cellValue as string}>Link</Link>
      ) : field === "status" ? (
        StatusDropdownData.find((item) => item.id === cellValue)?.name ||
        "Unknown Status"
      ) : (["interview_date", "application_date"] as Array<keyof Job>).includes(
          field
        ) ? (
        parseDateTime(cellValue as Date)
      ) : cellValue instanceof Date === false ? (
        cellValue
      ) : (
        false
      )}
    </div>
  )
}
