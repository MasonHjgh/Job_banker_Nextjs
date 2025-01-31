"use client"

import React, { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { request } from "utils/api"
import { ReactHookFormEdit } from "features/react-hook-forms/edit/ReactHookFormEdit"
import { ReactHookFormAdd } from "features/react-hook-forms/add/ReactHookFormAdd"
import { StatusDropdownData } from "utils/constants"
import { type Job } from "@prisma/client"
import ScrapyControllers from "features/scrapy/ScrapyControllers"
import { parseDateTime } from "utils/helper"
import { JobTableTitles } from "features/job-table/jobTable.constants"
import JobTableForm from "features/react-hook-forms/JobTableForm"
import { type Session } from "next-auth"
import { useJobStore, useLoadingStore } from "providers/Store"


type Props = {
  userData: Session
}
const JobTable = ({ userData }: Props) => {
  const [data, setData] = useState<Job[]>([])

  //selected item handler
  const [selectedItem, setSelectedItem] = useState<Job | null>(null)
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [newItem, setNewItem] = useState<Job | null>(null)
  const {refreshJobs} = useJobStore()
  const {setIsLoading} = useLoadingStore()

  const fetchData = async (signal?: AbortSignal) => {
    setIsLoading(true)
    try {
      const newdata = await request<Job[]>({
        url: `/jobs`,
        method: "GET",
        signal: signal,
      })
      setData(newdata.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }


  const editJob = async () => {
    setIsLoading(true)
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
    } finally {
      setIsLoading(false)
    }
  }

  const addJob = async () => {
    setIsLoading(true)
    try {
      if (!newItem) return

      let itemToAdd = { ...newItem, applicant_id: userData.user?.id }
      if (!newItem.status) {
        itemToAdd = { ...itemToAdd, status: "5" }
      }

      await request<Job>({
        url: "/jobs",
        method: "POST",
        data: itemToAdd,
      })

      setNewItem(null)
      setIsAddingItem(false)

      // TODO: You don't need to fetch the whole data again. Just update your local "data" state if the add request is successful.
      fetchData()
    } catch (error) {
      console.log(error)
    }finally {
      setIsLoading(false)
    }
  }

  const deleteJob = async () => {
    setIsLoading(true)
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
    }finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    fetchData(controller.signal)
    return () => {
      controller.abort()
    }
  }, [refreshJobs])

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

  return (
    <div className="overflow-x-auto">
      
      <div className="join">
        <div>
          {isAddingItem === false ? (
            <button
              className="btn join-item"
              onClick={() => setIsAddingItem(true)}
              disabled={selectedItem != null}
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
            {selectedItem ? "Save" : "Edit"}
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
          <button className="btn join-item" disabled>Search</button>
        </div>
        <ScrapyControllers userData={userData.user} />
      </div>

      {/* {isAddingItem ? (
           <div className="pt-5 ">
              <JobTableForm/>
              </div>
          
          ) : null} */}

      <table className="table">
        <thead>
          <tr>
            <th></th>
            {JobTableTitles.map((title, index) => (
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
                    <td>
                      {row.resume_link && (
                        <Link href={row.resume_link}>link</Link>
                      )}
                    </td>

                    <td>
                      {row.cover_letter_link && (
                        <Link href={row.cover_letter_link}>link</Link>
                      )}
                    </td>
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
