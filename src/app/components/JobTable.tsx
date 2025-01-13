"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { ClientApiRequestError, request } from "app/services/api"
import { ReactHookFormEdit } from "app/services/ReactHookFormEdit"
import { ReactHookFormAdd } from "app/services/ReactHookFormAdd"
import { StatusDropdownData } from "Resources/DropDownsData"
import { type Job } from "@prisma/client"
import ScrapyControllers from "app/services/scrapyControllers"

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
  status: string
  application_date: Date | null
  interview_date: Date | null
  resume_link: string
  cover_letter_link: string
  saved_date: Date | null
}

const JobTable = () => {
  const [data, setData] = useState<Job[]>([])

  //selected item handler
  const [selectedItem, setSelectedItem] = useState<Job | null>(null)
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [newItem, setNewItem] = useState<Job | null>(null)

  const fetchData = async (signal?: AbortSignal) => {
    try {
      const newdata = await request<Job[]>({
        url: "/jobs",
        method: "GET",
        signal: signal,
      })
      console.log(newdata)

      setData(newdata.data)
    } catch (error) {
      console.log(error)
    }
  }

  const editJob = async () => {
    try {
      const result = await request<Job>({
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
     
      if (!newItem) return
      if (!newItem.status) {
        newItem.status = "5"
      }
      const result = await request<Job>({
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
      const result = await request<Job>({
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
    fetchData()

    return () => {
      abortController.abort()
    }
  }, [])

  const onFieldUpdate = (field: keyof Job, value: any) => {
    setSelectedItem((prevState) => {
      if (prevState === null) {
        return null
      }
      return { ...prevState, [field]: value }
    })
  }

  const newItemFieldUpdate = (field: keyof Partial<Job>, value: any) => {
    setNewItem((prevState: any) => {
      return { ...prevState, [field]: value }
    })
  }

  const parseDateTime =(obj: String | Date | null)=>{
    if(typeof obj === "string"){
      return new Date(obj).toLocaleDateString();
    }
    if(obj instanceof Date){ 
      return obj.toLocaleDateString();
    }
    return "";
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
        <ScrapyControllers/>
    
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

          {data.length > 0 ? (
            data?.map((row, index) => (
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
                      {row.job_link && <Link href={row.job_link}>link</Link>}
                    </td>
                    <td>{parseDateTime(row.application_date)}</td>
                    <td>{row.contact}</td>
                    <td>
                      {StatusDropdownData.find(
                        (item) => item.id === Number(row.status)
                      )?.name || "Unknown Status"}
                    </td>
                    <td> {parseDateTime(row.interview_date)}</td>
                    <td>{row.resume_link}</td>
                    <td>{row.cover_letter_link}</td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td>data is empty</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default JobTable
