import React, { useState } from "react"
import { ClientApiRequestError, request } from "utils/api"
const ScrapyControllers = () => {
  const [scrapUrl, set_scrapUrl] = useState("")
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    set_scrapUrl(event.target.value)
  }

  const startScrap = async () => {
    try {
      const result = await request<any>({
        url: "/extraction",
        method: "POST",
        data: scrapUrl,
      })
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  const sourceDropDownData = [
    {
      id: 1,
      name: "Linkedin",
    },
    {
      id: 2,
      name: "Indeed",
    },
    {
      id: 3,
      name: "Glassdoor",
    },
  ]

  return (
    <div className="flex">
      <button className="btn join-item" onClick={startScrap}>
        Scrap
      </button>
      <select className="select select-bordered w-full max-w-xs" disabled>
        {sourceDropDownData.map((op, index) => (
          <option key={index} value={op.id}>
            {op.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        className="input input-bordered"
        value={scrapUrl}
        onChange={handleUrlChange}
      />
    </div>
  )
}
export default ScrapyControllers
