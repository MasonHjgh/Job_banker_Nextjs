export default class Job {
  constructor({
    id = "",
    company_name = "",
    position_name = "",
    salary = "",
    job_link = "",
    job_description = "",
    contact = "",
    status = 1,
    application_date = "",
    interview_date = "",
    resume_link = "",
    cover_letter_link = "",
    saved_date = "",
  } = {}) {
    this.id = id
    this.company_name = company_name
    this.position_name = position_name
    this.salary = salary
    this.job_link = job_link
    this.job_description = job_description
    this.contact = contact
    this.status = status
    this.application_date = application_date
    this.interview_date = interview_date
    this.resume_link = resume_link
    this.cover_letter_link = cover_letter_link
    this.saved_date = saved_date
  }
}
