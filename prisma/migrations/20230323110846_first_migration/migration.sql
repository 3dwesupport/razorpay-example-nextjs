/*
  Warnings:

  - You are about to drop the `CreateOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PaymentGateway` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CreateOrder";

-- DropTable
DROP TABLE "PaymentGateway";

-- CreateTable
CREATE TABLE "Orders" (
    "order_id" TEXT NOT NULL,
    "razorpay_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "receipt" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Payment_Info" (
    "index_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "razorpay_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Orders_order_id_key" ON "Orders"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_Info_index_id_key" ON "Payment_Info"("index_id");
