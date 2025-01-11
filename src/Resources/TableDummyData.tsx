import { type Job } from "@prisma/client"


const tableData: Job[] = [
  {
    id: 1,
    company_name: "Tech Corp",
    position_name: "Software Engineer",
    salary: "100,000",
    job_link: "https://techcorp.jobs/software-engineer",
    job_description: "Develop and maintain software applications.",
    contact: "john.doe@techcorp.com",
    status: "Applied",
    application_date: new Date("2023-01-15"),
    interview_date: new Date("2023-01-20"),
    resume_link: "https://myresume.com/johndoe",
    cover_letter_link: "https://myresume.com/lindagreen",
    applicant_id: 1,
    createdAt: new Date(),
  },
  // Add other job entries...
];

export default tableData;



// const tableData = [
//     {
//       position: "Software Engineer",
//       company: "Tech Corp",
//       salary: "100,000",
//       jobPosting: "https://techcorp.jobs/software-engineer",
//       applicationDate: "2023-01-15",
//       contact: "john.doe@techcorp.com",
//       status: "Applied",
//       interviewDate: "2023-01-20",
//       resumeLink: "https://myresume.com/johndoe",
//        coverLetter:"https://myresume.com/lindagreen"
//     },
//     {
//       position: "Data Scientist",
//       company: "DataWorks",
//       salary: "120,000",
//       jobPosting: "https://dataworks.jobs/data-scientist",
//       applicationDate: "2023-02-10",
//       contact: "jane.smith@dataworks.com",
//       status: "Interviewing",
//       interviewDate: "2023-02-15",
//       resumeLink: "https://myresume.com/janesmith",
//        coverLetter:"https://myresume.com/lindagreen"
//     },
//     {
//       position: "Product Manager",
//       company: "Innovate Inc.",
//       salary: "110,000",
//       jobPosting: "https://innovateinc.jobs/product-manager",
//       applicationDate: "2023-03-05",
//       contact: "mike.jones@innovateinc.com",
//       status: "Offer",
//       interviewDate: "2023-03-10",
//       resumeLink: "https://myresume.com/mikejones",
//        coverLetter:"https://myresume.com/lindagreen"
//     },
//     {
//       position: "UX Designer",
//       company: "DesignPro",
//       salary: "90,000",
//       jobPosting: "https://designpro.jobs/ux-designer",
//       applicationDate: "2023-04-20",
//       contact: "sarah.brown@designpro.com",
//       status: "Rejected",
//       interviewDate: "2023-04-25",
//       resumeLink: "https://myresume.com/sarahbrown",
//        coverLetter:"https://myresume.com/lindagreen"
//     },
//     {
//       position: "DevOps Engineer",
//       company: "Cloud Solutions",
//       salary: "115,000",
//       jobPosting: "https://cloudsolutions.jobs/devops-engineer",
//       applicationDate: "2023-05-10",
//       contact: "david.white@cloudsolutions.com",
//       status: "Applied",
//       interviewDate: "2023-05-15",
//       resumeLink: "https://myresume.com/davidwhite",
//        coverLetter:"https://myresume.com/lindagreen"
//     },
//     {
//       position: "Marketing Specialist",
//       company: "MarketMakers",
//       salary: "85,000",
//       jobPosting: "https://marketmakers.jobs/marketing-specialist",
//       applicationDate: "2023-06-01",
//       contact: "linda.green@marketmakers.com",
//       status: "Interviewing",
//       interviewDate: "2023-06-05",
//       resumeLink: "https://myresume.com/lindagreen",
//       coverLetter:"https://myresume.com/lindagreen"
//     },
//   ];
  
//   export default tableData;
  