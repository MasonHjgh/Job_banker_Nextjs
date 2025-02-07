

import Modal from "components/Modal"
import React, { useState } from "react"
import ScrapyJobForm  from "features/react-hook-forms/scrapy-job-form/ScrapyJobForm"
type Props = {}

const JobTableActionBarAdd = (props: Props) => {
const [isModalOpen, setIsModalOpen] = useState(false)
  const handleModalOpen = () => {
    setIsModalOpen(true)
  }
  const handleModalClose = () => {
    setIsModalOpen(false)
  }
  return (<>
     <button className="btn btn-accent " onClick={handleModalOpen}>Add</button>
     <Modal isOpen={isModalOpen} closeModal={handleModalClose}>
        <ScrapyJobForm jobData={null} closeModal={handleModalClose} />
      </Modal>
     </>
  )
}

export default JobTableActionBarAdd
