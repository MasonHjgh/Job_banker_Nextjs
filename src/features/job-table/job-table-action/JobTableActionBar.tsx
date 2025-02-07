"use client"
import React from "react"
import JobTableActionBarAdd from "./JobTableActionBarAdd"
import ScrapyControllers from "features/scrapy/ScrapyControllers"

type Props = {}

const JobTableActionBar = (props: Props) => {
  return (
    <div className="flex gap-2 p-3">
      <div>
        <JobTableActionBarAdd />
      </div>
      <div>
        <ScrapyControllers />
      </div>
    </div>
  )
}

export default JobTableActionBar
