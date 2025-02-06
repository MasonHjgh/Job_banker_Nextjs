"use client"
import React from "react"
import JobTable2ActionBarAdd from "./JobTable2ActionBarAdd"
import ScrapyControllers from "features/scrapy/ScrapyControllers"

type Props = {}

const JobTable2ActionBar = (props: Props) => {
  return (
    <div className="flex gap-2 p-3">
      <div>
        <JobTable2ActionBarAdd />
      </div>
      <div>
        <ScrapyControllers />
      </div>
    </div>
  )
}

export default JobTable2ActionBar
