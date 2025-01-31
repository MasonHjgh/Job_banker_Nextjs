import React from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { StatusDropdownData } from "utils/constants"
import { type Job } from "@prisma/client"
import { request } from "utils/api"
import { useLoadingStore, useJobStore } from "providers/Store"
type JobFormInputs = {
  company_name: string
  position_name: string
  salary?: string
  job_link?: string
  job_description?: string
  contact?: string
  status: string
  application_date?: string // Use string for date inputs
  interview_date?: string
  resume_link?: string
  cover_letter_link?: string
  applicant_id: string
}

type Props = {
  jobData: Job | null
  userData: any
  closeModal: () => void
}
const JobForm = ({ jobData, userData, closeModal }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Job>()
const {setIsLoading} = useLoadingStore()
const {setrefreshJobs} = useJobStore()
  const onSubmit: SubmitHandler<Job> = async (data) => {
    try {
      setIsLoading(true)
      if (!data) return

      data.applicant_id = userData.id

      await request<Job>({
        url: "/jobs",
        method: "POST",
        data: data,
      })
      closeModal()
    } catch (error) {
      console.log(error)
    } finally {
      setrefreshJobs()
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    reset() // Reset form fields to their default values
  }

  const fields = [
    { name: "position_name", label: "Position", type: "text", required: true },
    { name: "company_name", label: "Company", type: "text", required: true },
    { name: "salary", label: "Salary", type: "text" },
    { name: "job_link", label: "Job Link", type: "url" },
    { name: "contact", label: "Contact", type: "text" },
    { name: "status", label: "Status", type: "select" },
    { name: "application_date", label: "Application", type: "date" },
    { name: "interview_date", label: "Interview", type: "date" },
    { name: "resume_link", label: "Resume", type: "url" },
    { name: "cover_letter_link", label: "Cover Letter", type: "url" },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="max-h-80 flex flex-col overflow-y-auto px-5">
        <div className="grid grid-cols-2 gap-4">
          {fields.map(({ name, label, type, required }) => (
            <div key={name} className="flex flex-col">
              <label htmlFor={name} className="mb-1 font-small">
                {label}
              </label>
              {type === "select" ? (
                <select
                  {...register(name as keyof JobFormInputs, { required })}
                  className="select select-bordered w-full"
                  defaultValue={jobData?.status ? jobData.status : "5"}
                >
                  {StatusDropdownData.map((op, index) => (
                    <option key={index} value={op.id}>
                      {op.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={name}
                  type={type}
                  {...register(name as keyof JobFormInputs, { required })}
                  className="input input-bordered w-full"
                  defaultValue={
                    jobData
                      ? String(jobData[name as keyof JobFormInputs] || "")
                      : ""
                  }
                />
              )}
              {errors[name as keyof JobFormInputs] && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded text-sm w-16 h-10"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white rounded text-sm w-16 h-10 ml-2"
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  )
}

export default JobForm
