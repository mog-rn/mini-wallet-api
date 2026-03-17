-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEPOSIT', 'TRANSFER');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'SUCCESSFUL', 'FAILED');

-- CreateTable
CREATE TABLE "wallets" (
    "id" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "balance" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "status" "TransactionStatus" NOT NULL,
    "reference" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fromWalletId" TEXT,
    "toWalletId" TEXT NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "transactions_fromWalletId_idx" ON "transactions"("fromWalletId");

-- CreateIndex
CREATE INDEX "transactions_toWalletId_idx" ON "transactions"("toWalletId");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fromWalletId_fkey" FOREIGN KEY ("fromWalletId") REFERENCES "wallets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_toWalletId_fkey" FOREIGN KEY ("toWalletId") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
