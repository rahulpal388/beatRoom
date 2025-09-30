/*
  Warnings:

  - Added the required column `email` to the `Otp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Otp" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "username" TEXT NOT NULL;
