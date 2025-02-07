import type { Job } from "@prisma/client"
import { useJobStore, useLoadingStore } from "providers/Store"
import React from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { request } from "utils/api"
import { StatusDropdownData } from "utils/constants"
import { AiFillCloseCircle ,AiFillSave } from "react-icons/ai";
type Props = {
  row: Job
  cancelEdit: () => void
}

const JobTableRowEdit = ({ row, cancelEdit }: Props) => {
  {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Job>()
    const { setIsLoading } = useLoadingStore()
    const { setrefreshJobs } = useJobStore()
    
    const onSubmit: SubmitHandler<Job> = async (Item) => {
      try {
        Item.applicant_id = row.applicant_id
        Item.id = row.id
        setIsLoading(true)
        const result = await request<Job>({
          url: "/jobs",
          method: "PUT",
          data: Item,
        })
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(true)
        cancelEdit()
        setrefreshJobs()
      }
    }

    return (
      <form className="contents " onSubmit={handleSubmit(onSubmit)}>
        <div className=" min-w-[75px] max-w-[100px] break-words p-2 flex gap-1">
          <button className="btn btn-primary  h-[15px] p-1 min-h-6" type="submit" title="Save">
            <AiFillSave/>
          </button>
          <button className="btn btn-primary  h-[15px] p-1 min-h-6" title="Cancel" onClick={cancelEdit}>
            <AiFillCloseCircle/>
          </button>
        </div>
        {Object.keys(row).map((field, index) => {
          if (
            ["id", "job_description", "createdAt", "applicant_id"].includes(
              field
            )
          ) {
            return null
          }
          return (
            <div
              className=" min-w-[75px] max-w-[100px] break-words p-2"
              key={index}
            >
              {field === "interview_date" || field === "application_date" ? (
                <input
                  type="date"
                  className="input input-bordered max-w-[100px]"
                  {...register(field as keyof Job, { required: false })}
                />
              ) : field === "status" ? (
                <select
                  className="select select-bordered max-w-[100px]"
                  {...register(field as keyof Job, { required: true })}
                  defaultValue={row?.status ? row.status : "5"}
                >
                  {StatusDropdownData.map((op, selectIndex) => (
                    <option key={selectIndex} value={op.id}>
                      {op.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  {...register(field as keyof Job, {
                    required:
                      field === "company_name" || field === "position_name"
                        ? true
                        : false,
                  })}
                  defaultValue={
                    row ? String(row[field as keyof Job] || "") : ""
                  }
                  className="input input-bordered max-w-[100px]"
                />
              )}
              {errors[field as keyof Job] && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
          )
        })}
      </form>
    )
  }
}

export default JobTableRowEdit
