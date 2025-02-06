import React from "react"
import Job from "@prisma/client"
type Props = {
  titles: string[]
}

const JobTable2Header = ({ titles }: Props) => {
  return (
    <div className="grid grid-cols-11 bg-gray-200 text-gray-700 font-semibold  rounded-t  sticky top-0 z-10">
      {titles.map((title, index) => {
        return (
          <div key={index} className="p-2 min-w-[75px] max-w-[100px]">
            {title}
          </div>
        )
      })}
    </div>
  )
}

export default JobTable2Header
