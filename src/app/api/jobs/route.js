import { connectToDB } from "../../../utils/database.js";
import { NextResponse, NextRequest } from "next/server.js";
import Job from "../../../models/Job.js";

// GET all Jobs
export async function GET() {
  try {
    const client = await connectToDB();
    const result = await client.query(
      "SELECT * FROM Job order by saved_date desc"
    );
    const jobs = result.rows;
    return NextResponse.json(jobs);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

// Edit Job
export async function PUT(request) {
  try {
    const job = await request.json();
    const client = await connectToDB();
    const query = `
  UPDATE Job
  SET
    company_name = $1,
    position_name = $2,
    salary = $3,
    job_link = $4,
    job_description = $5,
    contact = $6,
    status = $7,
    application_date = $8,
    interview_date = $9,
    resume_link = $10,
    cover_letter_link = $11,
    saved_date = $12
  WHERE id = $13
  RETURNING *;
`;

    const values = [
      job.company_name,
      job.position_name,
      job.salary,
      job.job_link,
      job.job_description,
      job.contact,
      job.status,
      job.application_date,
      job.interview_date,
      job.resume_link,
      job.cover_letter_link,
      job.saved_date,
      job.id,
    ];

    const result = await client.query(query, values);

    const jobs = result.rows;
    if (result.rows.length > 0) {
      return NextResponse.json(jobs);
    } else {
      return NextResponse.json("Job not found");
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

// Add Job
export async function POST(request) {
  try {
    const job = new Job(await request.json());
    const client = await connectToDB();
    const query = `
            INSERT INTO Job (
              company_name, position_name, salary, job_link, job_description,
              contact, status, application_date, interview_date, resume_link,
              cover_letter_link, saved_date
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
             RETURNING *
          `;
    const values = [
      job.company_name,
      job.position_name,
      job.salary,
      job.job_link,
      job.job_description,
      job.contact,
      job.status,
      job.application_date,
      job.interview_date,
      job.resume_link,
      job.cover_letter_link,
      Date.now(),
    ];
    const result = await client.query(query, values);
    return NextResponse.json({
      message: "Job added successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

// Delete Job
export async function DELETE(request) {
  try {
    const job = new Job(await request.json());
    const client = await connectToDB();
    const result = await client.query(
      "delete from Job where id = $1 Returning *",
      [job.id],
      (error, results) => {
        if (error) {
          return NextResponse.json(error);
        }
      }
    );
    return NextResponse.json("deleted successfully");
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
