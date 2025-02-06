import React, { useState } from "react"
import { type Job } from "@prisma/client"
import JobTable2RowEdit from "./JobTable2RowEdit"
import JobTable2RowNotEdit from "./JobTable2RowNotEdit"
import { AiFillEdit } from "react-icons/ai";
import JobTable2RowDelete from "./JobTable2RowDelete"

type Props = {
  row: Job
}

export default function JobTable2Row({ row }: Props) {
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
         <JobTable2RowDelete row={row}/>
        </div>
      ) : null}

      {isEditing === row.id ? (
        <JobTable2RowEdit row={row} cancelEdit={handleSetNotEditing}/>
      ) : (
        <JobTable2RowNotEdit row={row} />
      )}
    </div>
  )
}
