-- CreateTable
CREATE TABLE "Payment_Info" (
    "index_id" TEXT NOT NULL,
    "gateway" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "gatewayId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "paymentTime" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_Info_index_id_key" ON "Payment_Info"("index_id");
