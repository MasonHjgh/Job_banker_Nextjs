import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { StatusDropdownData } from "Resources/DropDownsData"

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

const JobForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobFormInputs>()

  const onSubmit: SubmitHandler<JobFormInputs> = (data) => {
    console.log(data)
  }

  const handleCancel = () => {
    reset() // Reset form fields to their default values
  }

  const fields = [
    { name: "position_name", label: "Position", type: "text", required: true },
    { name: "company_name", label: "Company", type: "text" , required: true },
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
      <div className="flex  gap-4">
        <div className="flex-2 min-w-0 max-w-40 pt-7 gap-2 ">
          <button type="submit" className="bg-blue-500 text-white  rounded  text-sm w-16 h-10">
            Save
          </button>
          
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white  rounded text-sm w-16 h-10 ml-2"
          >
            Cancel
          </button>
        </div>
       
        {fields.map(({ name, label, type, required }) => (
          <div key={name} className="flex-1 min-w-0 ">
            <label htmlFor={name} className="mb-1 font-small">
              {label}
            </label>
            {type === "textarea" ? (
              <textarea
                id={name}
                {...register(name as keyof JobFormInputs, { required})}
                className="border  rounded w-full"
              />
            ) : type === "select"?
            (<select className="select select-bordered w-full">
              {StatusDropdownData.map((op, index) => (
                          <option key={index} value={op.id} >
                            {op.name}
                          </option>
                        ))}
            </select>)
           : 
            (
              <input
                id={name}
                type={type}
                {...register(name as keyof JobFormInputs, { required })}
                className="input input-bordered w-full max-w-25"
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
    </form>
  )
}

export default JobForm
