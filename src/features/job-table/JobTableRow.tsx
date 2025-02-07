import React, { useState } from "react"
import { type Job } from "@prisma/client"
import JobTableRowEdit from "./JobTableRowEdit"
import JobTableRowNotEdit from "./JobTableRowNotEdit"
import { AiFillEdit } from "react-icons/ai";
import JobTableRowDelete from "./JobTableRowDelete"

type Props = {
  row: Job
}

export default function JobTableRow({ row }: Props) {
  const [isEditing, setisEditing] = useState<number | null>(null)

  const handleSetEditing = () => {
    setisEditing(row.id)
  }
  const handleSetNotEditing =()=>{
    setisEditing(null)
  }
  return (
    <div className="grid grid-cols-11  divide-gray-300 border border-gray-300 hover:bg-gray-100">
      {isEditing !== row.id ? (
        <div className="flex min-w-[75px] max-w-[100px] p-2 gap-1">
          <button
            className="btn btn-primary h-[15px] p-1 min-h-6"
            onClick={handleSetEditing}  title="Edit Row"
          >
            <AiFillEdit/>
          </button>
         <JobTableRowDelete row={row}/>
        </div>
      ) : null}

      {isEditing === row.id ? (
        <JobTableRowEdit row={row} cancelEdit={handleSetNotEditing}/>
      ) : (
        <JobTableRowNotEdit row={row} />
      )}
    </div>
  )
}
