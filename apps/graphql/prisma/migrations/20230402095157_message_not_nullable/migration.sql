/*
  Warnings:

  - Made the column `message` on table `Message` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "message" SET NOT NULL;
