import type { Job } from "@prisma/client"
import Modal from "components/Modal"
import ScrapyJobForm from "features/react-hook-forms/scrapy-job-form/ScrapyJobForm"
import React, { useState } from "react"
import { request } from "utils/api"

type Props = {
  userData: any
}

const ScrapyControllers = ({ userData }: Props) => {
  const [scrapUrl, set_scrapUrl] = useState("")
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) setUrlError("")
    set_scrapUrl(event.target.value)
  }
  const [urlError, setUrlError] = useState("")
  const [scrapData, setScrapData] = useState<Job | null>(null)
  const startScrap = async () => {
    try {
      if (!scrapUrl) {
        setUrlError("Please enter a url")
        return
      }
      const result = await request<any>({
        url: "/extraction",
        method: "POST",
        data: scrapUrl,
      })
      setScrapData(result.data)
      handleModalOpen()
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

  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleModalOpen = () => {
    setIsModalOpen(true)
  }
  const handleModalClose = () => {
    setIsModalOpen(false)
  }
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
      <div className="flex flex-col">
        <label htmlFor="scrap_url" className="mb-1 text-sm">
          Scrap Url
        </label>
        <input
          type="text"
          className="input input-bordered"
          value={scrapUrl}
          name="scrap_url"
          onChange={handleUrlChange}
        />
        {urlError && <p className="text-red-500 text-sm">{urlError}</p>}
      </div>
      <Modal isOpen={isModalOpen} closeModal={handleModalClose}>
        <ScrapyJobForm
          jobData={scrapData}
          userData={userData}
          closeModal={handleModalClose}
        />
      </Modal>
    </div>
  )
}
export default ScrapyControllers
