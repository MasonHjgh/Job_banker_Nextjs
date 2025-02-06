import type { Job } from "@prisma/client"
import Link from "next/link"
import React from "react"
import { StatusDropdownData } from "utils/constants"
import { parseDateTime } from "utils/helper"

type Props = {
  cell: any
  fieldType: string
}

export default function JobTable2Cell({ cell, fieldType }: Props) {
  return (
    <div className="min-w-[75px] max-w-[100px] break-words p-2">
      {["job_link", "resume_link", "cover_letter_link"].includes(fieldType) &&
      cell ? (
        <Link href={cell}>Link</Link>
      ) : fieldType === "status" ? (
        StatusDropdownData.find((item) => item.id === cell)?.name ||
        "Unknown Status"
      ) : ["interview_date", "application_date"].includes(fieldType) ? (
        parseDateTime(cell)
      ) : (
        cell
      )}
    </div>
  )
}
