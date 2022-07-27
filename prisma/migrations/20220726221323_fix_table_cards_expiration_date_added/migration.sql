/*
  Warnings:

  - Added the required column `expirationDate` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "expirationDate" TIMESTAMP(3) NOT NULL;
