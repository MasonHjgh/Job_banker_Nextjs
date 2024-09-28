import type { JobsResponseType } from "app/components/JobTable";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StatusDropdownData } from "Resources/DropDownsData";

type Props = {
  item: JobsResponseType;
  onFieldUpdate: (field: keyof JobsResponseType, value: any) => void;
};
export const ReactHookFormEdit = ({ item, onFieldUpdate }: Props) => {
  const { register } = useForm({
    defaultValues: {
      position_name: item.position_name,
      company_name: item.company_name,
      salary: item.salary,
      job_link: item.job_link,
      job_description: item.job_description,
      contact: item.contact,
      status: item.status,
      application_date: item.application_date,
      interview_date: item.interview_date,
      resume_link: item.resume_link,
      cover_letter_link: item.cover_letter_link,
      saved_date: item.saved_date,
    },
  });

  return (
    <>
      <td>
        <input
          {...register("position_name", {
            onChange: (evt) => onFieldUpdate("position_name", evt.target.value),
          })}
          type="text"
          className="input input-bordered w-full"
        />
      </td>
      <td>
        <input
          {...register("company_name", {
            onChange: (evt) => onFieldUpdate("company_name", evt.target.value),
          })}
          type="text"
          className="input input-bordered w-full"
        />
      </td>
      <td>
        <input
          {...register("salary", {
            onChange: (evt) => onFieldUpdate("salary", evt.target.value),
          })}
          type="text"
          className="input input-bordered w-full"
        />
      </td>
      <td>
        <input
          {...register("job_link", {
            onChange: (evt) => onFieldUpdate("job_link", evt.target.value),
          })}
          type="text"
          className="input input-bordered w-full"
        />
      </td>
      <td>
        {" "}
        <input
          {...register("job_description", {
            onChange: (evt) => onFieldUpdate("job_description", evt.target.value),
          })}
          type="text"
          className="input input-bordered w-full"
        />
      </td>
      <td>
        <input
          type="text"
          {...register("contact", {
            onChange: (evt) => onFieldUpdate("contact", evt.target.value),
          })}
          className="input input-bordered w-full"
        />
      </td>
      <td>
      <select
          className="select select-bordered w-full max-w-xs"
          {...register("status", {
            onChange: (evt) => onFieldUpdate("status", evt.target.value),
          })}
        >
          {StatusDropdownData.map((op, index) => (
            <option key={index} value={op.id} >
              {op.name}
            </option>
          ))}
        </select>
      </td>
      <td>
        <input
          type="text"
          {...register("application_date", {
            onChange: (evt) => onFieldUpdate("application_date", evt.target.value),
          })}
          className="input input-bordered w-full"
        />
      </td>
      <td>
        <input
          type="text"
          {...register("resume_link", {
            onChange: (evt) => onFieldUpdate("resume_link", evt.target.value),
          })}
          className="input input-bordered w-full"
        />
      </td>
      <td>
        <input
          type="text"
          {...register("cover_letter_link", {
            onChange: (evt) => onFieldUpdate("cover_letter_link", evt.target.value),
          })}
          className="input input-bordered w-full"
        />
      </td>
    </>
  );
};
