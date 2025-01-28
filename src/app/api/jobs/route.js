import { NextResponse, NextRequest } from "next/server.js"
import { prisma } from "utils/prisma"

// GET all Jobs
export async function GET() {
  try {
    const results = await prisma.job.findMany()
    return NextResponse.json(results)
  } catch (error) {
    console.log(error)
    return NextResponse.json(error)
  }
}

// Edit Job
export async function PUT(request) {
  try {
    const job = await request.json()
    const updatedJob = await prisma.job.update({
      where: {
        id: job.id,
      },
      data: {
        company_name: job.company_name,
        position_name: job.position_name,
        salary: job.salary,
        job_link: job.job_link,
        job_description: job.job_description,
        contact: job.contact,
        status: job.status,
        application_date: job.application_date,
        interview_date: job.interview_date,
        resume_link: job.resume_link,
        cover_letter_link: job.cover_letter_link,
      },
    })
   
    return NextResponse.json(updatedJob)
  } catch (error) {
    console.log(error)
    return NextResponse.json(error)
  }
}

// Add Job
export async function POST(request) {
  try {
    // Parse the incoming request body
    const jobData = await request.json()
    
    if (jobData.application_date){
      jobData.application_date = new Date(jobData.application_date)
    }else{
      jobData.application_date = null
    }
    if (jobData.interview_date){
      jobData.interview_date = new Date(jobData.interview_date)
    } else {
      jobData.interview_date = null
    }
  
    
    // Use Prisma's create method to insert a new job into the database
    const job = await prisma.job.create({
      data: {
        company_name: jobData.company_name,
        position_name: jobData.position_name,
        salary: jobData.salary,
        job_link: jobData.job_link,
        job_description: jobData.job_link || null, // Optional field, so fallback to null if not provided
        contact: jobData.contact,
        status: jobData.status, // Assuming status is a string, not a number
        application_date: jobData.application_date,
        interview_date: jobData.interview_date,
        resume_link: jobData.resume_link,
        cover_letter_link: jobData.cover_letter_link,
        applicant_id: jobData.applicant_id, // Assuming applicant_id is always 1 for now
      },
    })

    return NextResponse.json({
      message: "Job added successfully",
      status: 200,
      job, // Return the created job as part of the response
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      message: "Failed to add job",
      status: 500,
      error: error.message,
   
    })
  }
}

// Delete Job
export async function DELETE(request) {
  try {
    const job = await request.json()
    const deleteJob = await prisma.job.delete({
      where: {
        id: job.id,
      },
    })
    return NextResponse.json(deleteJob)
  } catch (error) {
    console.log(error)
    return NextResponse.json(error)
  }
}
