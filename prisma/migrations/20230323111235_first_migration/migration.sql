/*
  Warnings:

  - Added the required column `gateway` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gateway` to the `Payment_Info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "gateway" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment_Info" ADD COLUMN     "gateway" TEXT NOT NULL;
