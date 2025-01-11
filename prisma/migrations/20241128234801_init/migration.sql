-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "company_name" TEXT NOT NULL,
    "position_name" TEXT NOT NULL,
    "salary" TEXT,
    "job_link" TEXT,
    "job_description" TEXT,
    "contact" TEXT,
    "status" TEXT NOT NULL,
    "application_date" TIMESTAMP(3),
    "interview_date" TIMESTAMP(3),
    "resume_link" TEXT NOT NULL,
    "cover_letter_link" TEXT NOT NULL,
    "applicant_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Job_resume_link_key" ON "Job"("resume_link");

-- CreateIndex
CREATE UNIQUE INDEX "Job_cover_letter_link_key" ON "Job"("cover_letter_link");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
