/*
  Warnings:

  - A unique constraint covering the columns `[user_id,course_id]` on the table `price_alert` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `course_id` to the `price_alert` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `price_alert` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "price_alert" ADD COLUMN     "course_id" TEXT NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "price_alert_user_id_course_id_key" ON "price_alert"("user_id", "course_id");

-- AddForeignKey
ALTER TABLE "price_alert" ADD CONSTRAINT "price_alert_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
