"use client";
import React, { useEffect, useState } from "react";
import tableData from "../Resources/TableDummyData";
import Link from "next/link";
import { ClientApiRequestError, request } from "services/api";

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
];

// two ways to do it here. First is to create a "Record<string, any>" which is trashy but works.>
// the other is to type each property of the object. which is how you should always do.
type JobsResponseType = {
  id: string;
  company_name: string;
  position_name: string;
  salary: string;
  job_link: string;
  job_description: string;
  contact: string;
  status: number;
  application_date: string | null;
  interview_date: string | null;
  resume_link: string;
  cover_letter_link: string;
  saved_date: string | null;
};

const JobTable = () => {
  const [data, setData] = useState<JobsResponseType[]>([]);

  //selected item handler
  const [selectedItem, setSelectedItem] = useState<
    JobsResponseType | undefined
  >(undefined);
  const handleSelectedItem = (item: JobsResponseType) => {
    setSelectedItem(item);
  };

  //load data on the start of the page
  const fetchData = async () => {
    try {
      const newdata = await request<JobsResponseType[]>({
        url: "/jobs",
      });
      setData(newdata.data);
    } catch (error) {
      // Can't type it directly in the trycatch
      // will do it inline
      // console.log((error as ClientApiRequestError).type);
      // our own custom error with custom properties with nice little messages.
    }

    // now about the custom error object we had, you can handle it like this:
  };

  const editItem1 = async () => {
    try {
      const result = await request<JobsResponseType>({
        url: "/jobs",
        method: "PUT",
        data: selectedItem,
      });
      console.log(result);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="join">
        <div>
          <button className="btn join-item">Add</button>
        </div>

        <div>
          {/* <button className="btn join-item" onClick={editItem}>Edit</button> */}
        </div>
        <div>
          <button className="btn join-item">Delete</button>
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
          {data.map((row, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>
                <input
                  type="radio"
                  className="radio"
                  value={row.id}
                  id={"select" + (index + 1).toString()}
                  onChange={() => handleSelectedItem(row)}
                  checked={selectedItem?.id === row.id}
                />
              </td>
              {selectedItem && selectedItem.id === row.id ? (
                <>
                  <td>
                    <input type="text" value={row.position_name} className="input input-bordered w-full"/>
                  </td>
                  <td>{row.company_name}</td>
                  <td>${row.salary}</td>
                  <td>
                    <Link href={row.job_link}>link</Link>
                  </td>
                  <td>{row.application_date}</td>
                  <td>{row.contact}</td>
                  <td>{row.status}</td>
                  <td>{row.interview_date}</td>
                  <td>{row.resume_link}</td>
                  <td>{row.cover_letter_link}</td>
                </>
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
                  <td>{row.status}</td>
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
  );
};

export default JobTable;
