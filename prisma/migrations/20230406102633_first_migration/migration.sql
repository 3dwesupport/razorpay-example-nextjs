-- CreateTable
CREATE TABLE "Razorpay_Link" (
    "id" TEXT NOT NULL,
    "gateway" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Razorpay_Link_id_key" ON "Razorpay_Link"("id");
