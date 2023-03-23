-- CreateTable
CREATE TABLE "PaymentGateway" (
    "index_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "razorpay_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentGateway_index_id_key" ON "PaymentGateway"("index_id");
