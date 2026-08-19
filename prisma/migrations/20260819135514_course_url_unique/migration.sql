/*
  Warnings:

  - A unique constraint covering the columns `[course_url]` on the table `course` will be added. If there are existing duplicate values, this will fail.
  - Made the column `course_url` on table `course` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "course" ALTER COLUMN "course_url" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "course_course_url_key" ON "course"("course_url");
