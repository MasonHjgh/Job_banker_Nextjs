"use client";
import React, { useState } from "react";
import tableData from "../Resources/TableDummyData";
import Link from "next/link";


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
  "Cover Letter"
];

const JobTable = () => {
  const [data, setData] = useState(tableData);

  return (
    <div className="overflow-x-auto">
      <div className="join">
        <div>
          <button className="btn join-item">Add</button>
        </div>

        <div>
          <button className="btn join-item">Edit</button>
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
                <input type="checkbox" className="checkbox checkbox-sm" />
              </td>
              <td>{row.position}</td>
              <td>{row.company}</td>
              <td>${row.salary}</td>
              <td>
                <Link href={row.jobPosting}>{row.jobPosting}</Link>
              </td>
              <td>{row.applicationDate}</td>
              <td>{row.contact}</td>
              <td>{row.status}</td>
              <td>{row.interviewDate}</td>
              <td>{row.resumeLink}</td>
              <td>{row.coverLetter}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
