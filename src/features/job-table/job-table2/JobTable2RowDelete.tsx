import type { Job } from "@prisma/client"
import Modal from "components/Modal"
import { useJobStore, useLoadingStore } from "providers/Store"
import React, { useState } from "react"
import { AiFillDelete } from "react-icons/ai"
import { request } from "utils/api"

type Props = {
  row: Job
}

const JobTable2RowDelete = ({ row }: Props) => {
  const { setIsLoading } = useLoadingStore()
  const { setrefreshJobs } = useJobStore()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const deleteJob = async () => {
    setIsLoading(true)
    try {
      const result = await request<Job>({
        url: `/jobs`,
        method: "DELETE",
        data: row,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      setrefreshJobs()
      handleModalClose()
    }
  }

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }
  const handleModalClose = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <button
        className="btn btn-primary h-[15px] p-1 min-h-6"
        title="Delete Row"
        onClick={handleModalOpen}
      >
        <AiFillDelete />
      </button>
      <Modal closeModal={handleModalClose} isOpen={isModalOpen}>
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <p>Do you confirm the delete for this job?</p>
          </div>
          <div className="flex justify-center gap-3">
            <button className="btn btn-primary " onClick={deleteJob}>
              Yes
            </button>
            <button className="btn btn-secondary  " onClick={handleModalClose}>
              No
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default JobTable2RowDelete
