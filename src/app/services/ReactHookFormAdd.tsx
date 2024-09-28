import type { JobsResponseType } from "app/components/JobTable";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StatusDropdownData } from "Resources/DropDownsData";

type Props = {
  onFieldChange: (field: keyof Partial<JobsResponseType>, value: any) => void;
};
export const ReactHookFormAdd = ({ onFieldChange }: Props) => {
  const { register } = useForm();

  return (
    <>
      <td>
        <input
          {...register("position_name", {
            onChange: (evt) => onFieldChange("position_name", evt.target.value),
          })}
          type="text"
          className="input input-bordered w-full"
        />
      </td>
      <td>
        <input
          {...register("company_name", {
            onChange: (evt) => onFieldChange("company_name", evt.target.value),
          })}
          type="text"
          className="input input-bordered w-full"
        />
      </td>
      <td>
        <input
          {...register("salary", {
            onChange: (evt) => onFieldChange("salary", evt.target.value),
          })}
          type="text"
          className="input input-bordered w-full"
        />
      </td>
      <td>
        <input
          {...register("job_link", {
            onChange: (evt) => onFieldChange("job_link", evt.target.value),
          })}
          type="text"
          className="input input-bordered w-full"
        />
      </td>
      <td>
        {" "}
        <input
          {...register("job_description", {
            onChange: (evt) =>
              onFieldChange("job_description", evt.target.value),
          })}
          type="text"
          className="input input-bordered w-full"
        />
      </td>
      <td>
        <input
          type="text"
          {...register("contact", {
            onChange: (evt) => onFieldChange("contact", evt.target.value),
          })}
          className="input input-bordered w-full"
        />
      </td>
      <td>
        <select
          className="select select-bordered w-full max-w-xs"
          {...register("status", {
            onChange: (evt) => onFieldChange("status", evt.target.value),
          })}
          defaultValue={5}
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
            onChange: (evt) =>
              onFieldChange("application_date", evt.target.value),
          })}
          className="input input-bordered w-full"
        />
      </td>
      <td>
        <input
          type="text"
          {...register("resume_link", {
            onChange: (evt) => onFieldChange("resume_link", evt.target.value),
          })}
          className="input input-bordered w-full"
        />
      </td>
      <td>
        <input
          type="text"
          {...register("cover_letter_link", {
            onChange: (evt) =>
              onFieldChange("cover_letter_link", evt.target.value),
          })}
          className="input input-bordered w-full"
        />
      </td>
    </>
  );
};
