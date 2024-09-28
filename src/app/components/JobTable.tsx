"use client"

import React, { useEffect, useState } from "react"
import tableData from "../../Resources/TableDummyData"
import Link from "next/link"
import { ClientApiRequestError, request } from "app/services/api"
import { ReactHookFormEdit } from "app/services/ReactHookFormEdit"
import { ReactHookFormAdd } from "app/services/ReactHookFormAdd"
import { StatusDropdownData } from "Resources/DropDownsData"


const tableTitles = [
  "Select",
  "Position",
  "Company",
  "Salary",
  "Job Posting",
  "Application Date",
  "Contact",
  "Status",
  "Interview Date",
  "Resume Link",
  "Cover Letter",
]

export type JobsResponseType = {
  id: string
  company_name: string
  position_name: string
  salary: string
  job_link: string
  job_description: string
  contact: string
  status: number
  application_date: string
  interview_date: string
  resume_link: string
  cover_letter_link: string
  saved_date: string | null
}

const JobTable = () => {
  const [data, setData] = useState<JobsResponseType[]>([])

  //selected item handler
  const [selectedItem, setSelectedItem] = useState<JobsResponseType | null>(
    null
  )
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [newItem, setNewItem] = useState<JobsResponseType | null>(null)

  const fetchData = async (signal?: AbortSignal) => {
    try {
      const newdata = await request<JobsResponseType[]>({
        url: "/jobs",
        signal: signal,
      })
      setData(newdata.data)
    } catch (error) {
      console.log(error)
    }
  }

  const editJob = async () => {
    try {
      const result = await request<JobsResponseType>({
        url: "/jobs",
        method: "PUT",
        data: selectedItem,
      })
      setSelectedItem(null)

      // TODO: You don't need to fetch the whole data again. Just update your local "data" state if the edit request is successful.
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  const addJob = async () => {
    try {
      const result = await request<JobsResponseType>({
        url: "/jobs",
        method: "POST",
        data: newItem,
      })
      setNewItem(null)
      setIsAddingItem(false)

      // TODO: You don't need to fetch the whole data again. Just update your local "data" state if the add request is successful.
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteJob = async () => {
    try {
      const result = await request<JobsResponseType>({
        url: `/jobs`,
        method: "DELETE",
        data: selectedItem,
      })
      setSelectedItem(null)

      // TODO: You don't need to fetch the whole data again. Just update your local "data" state if the delete request is successful.
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()

    fetchData(abortController.signal)

    return () => {
      abortController.abort()
    }
  }, [])

  const onFieldUpdate = (field: keyof JobsResponseType, value: any) => {
    setSelectedItem((prevState) => {
      if (prevState === null) {
        return null
      }
      return { ...prevState, [field]: value }
    })
  }

  const newItemFieldUpdate = (
    field: keyof Partial<JobsResponseType>,
    value: any
  ) => {
    setNewItem((prevState: any) => {
      return { ...prevState, [field]: value }
    })
  }
  return (
    <div className="overflow-x-auto">
      <div className="join">

        <div>
          {isAddingItem === false ? (
            <button
              className="btn join-item"
              onClick={() => setIsAddingItem(true)}
            >
              Add
            </button>
          ) : (
            <button className="btn join-item" onClick={addJob}>
              Save
            </button>
          )}
        </div>

        {isAddingItem ? (
          <div>
            <button
              className="btn join-item"
              onClick={() => setIsAddingItem(false)}
            >
              Cancel
            </button>
          </div>
        ) : null}

        <div>
          <button
            className="btn join-item"
            onClick={editJob}
            disabled={!selectedItem}
          >
            Edit
          </button>
        </div>

        <div>
          <button
            className="btn join-item"
            onClick={deleteJob}
            disabled={!selectedItem}
          >
            Delete
          </button>
        </div>

        <div>
          <button className="btn join-item">Search</button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th></th>
            {tableTitles.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {isAddingItem ? (
            <tr>
              <th></th>
              <th></th>
              <ReactHookFormAdd onFieldChange={newItemFieldUpdate} />
            </tr>
          ) : null}

          {data.map((row, index) => (
            <tr key={index}>
              <th>{index + 1}</th>

              <td>
                <input
                  type="radio"
                  className="radio"
                  value={row.id}
                  id={"select" + (index + 1).toString()}
                  onChange={() => setSelectedItem(row)}
                  checked={selectedItem?.id === row.id}
                  onClick={() => {
                    selectedItem?.id === row.id
                      ? setSelectedItem(null)
                      : setSelectedItem(row)
                  }}
                />
              </td>
              
              {selectedItem && selectedItem.id === row.id ? (
                <ReactHookFormEdit
                  item={selectedItem}
                  onFieldUpdate={onFieldUpdate}
                />
              ) : (
                <>
                  <td>{row.position_name}</td>
                  <td>{row.company_name}</td>
                  <td>${row.salary}</td>
                  <td>
                    <Link href={row.job_link}>link</Link>
                  </td>
                  <td>{row.application_date}</td>
                  <td>{row.contact}</td>
                  <td>
                    {StatusDropdownData.find((item) => item.id === row.status)
                      ?.name || "Unknown Status"}
                  </td>
                  <td>{row.interview_date}</td>
                  <td>{row.resume_link}</td>
                  <td>{row.cover_letter_link}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default JobTable
