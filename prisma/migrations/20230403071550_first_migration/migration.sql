-- CreateTable
CREATE TABLE "PaytmPayment_Info" (
    "index_id" TEXT NOT NULL,
    "gateway" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "Status" TEXT NOT NULL,
    "amount" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PaytmPayment_Info_index_id_key" ON "PaytmPayment_Info"("index_id");
