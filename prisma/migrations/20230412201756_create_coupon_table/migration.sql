-- CreateTable
CREATE TABLE "coupons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "percentage" DECIMAL NOT NULL,
    "expireDate" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "coupons_id_key" ON "coupons"("id");
