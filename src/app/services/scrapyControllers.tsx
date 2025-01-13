import React, { useState } from "react"
import { ClientApiRequestError, request } from "app/services/api"
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
  return (
    <div>
      <button className="btn join-item" onClick={startScrap}>
        Scrap
      </button>
      <input
        type="text"
        className=""
        value={scrapUrl}
        onChange={handleUrlChange}
      />
    </div>
  )
}
export default ScrapyControllers
