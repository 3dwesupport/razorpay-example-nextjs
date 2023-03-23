-- CreateTable
CREATE TABLE "CreateOrder" (
    "order_id" TEXT NOT NULL,
    "razorpay_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "receipt" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CreateOrder_order_id_key" ON "CreateOrder"("order_id");
