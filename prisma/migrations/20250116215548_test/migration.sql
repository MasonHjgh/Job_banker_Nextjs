-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_applicant_id_fkey";

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "applicant_id" DROP NOT NULL;
