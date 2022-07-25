/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `credentials` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `login` to the `credentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `credentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `credentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `credentials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "credentials" ADD COLUMN     "login" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "credentials_name_key" ON "credentials"("name");
