import { Decimal } from "../../generated/prisma/internal/prismaNamespaceBrowser.ts";
import {prisma} from "../lib/prisma.ts";
import { BadRequestError, NotFoundError } from "../utils/error.ts";

export const deposit = async (walletId: string, amount: number, reference?: string) => {
    return await prisma.$transaction(async (tx) => {
        // Ensure that the wallet exists
        const wallet = await tx.wallet.findUnique({
            where: { id: walletId },
        })

        if (!wallet) {
            throw new NotFoundError('Wallet');
        }

        // update the wallet balance
        await tx.wallet.update({
            where: { id: walletId },
            data: {
                balance: {
                    increment: amount,
                }
            }
        })

        // create the transaction record for the deposit
        const transaction = await tx.transaction.create({
            data: {
                type: 'DEPOSIT',
                amount,
                status: 'SUCCESSFUL',
                toWalletId: walletId,
                reference: reference ?? null,
            }
        })
        return transaction;
    })
}

export const transfer = async (fromWalletId: string, toWalletId: string, amount: number, reference?: string) => {
    return await prisma.$transaction(async (tx) => {
        // Ensure that the sender wallet exists
        const sender = await tx.wallet.findUnique({
            where: { id: fromWalletId },
        })

        if (!sender) {
            throw new NotFoundError('Sender wallet');
        }

        // Ensure that the receiver wallet exists
        const receiver = await tx.wallet.findUnique({
            where: { id: toWalletId },
        })
        if (!receiver) {
            throw new NotFoundError('Receiver wallet');
        }


        // Ensure that the sender has sufficient balance
        if (sender.balance.lessThan(new Decimal(amount))) {
            await tx.transaction.create({
                data: {
                    type: 'TRANSFER',
                    amount,
                    status: 'FAILED',
                    fromWalletId,
                    toWalletId,
                    reference: reference ?? null,
                }
            })
            throw new BadRequestError('Insufficient balance');
        }

        // Debit the sender's wallet
        await tx.wallet.update({
            where: { id: fromWalletId },
            data: {
                balance: {
                    decrement: amount,
                }
            }
        })

        // Credit the receiver's wallet
        await tx.wallet.update({
            where: { id: toWalletId },
            data: {
                balance: {
                    increment: amount,
                }
            }
        })

        // create the transaction record for the transfer
        const transaction = await tx.transaction.create({
            data: {
                type: 'TRANSFER',
                amount,
                status: 'SUCCESSFUL',
                fromWalletId,
                toWalletId
            }
        })
        return transaction;
    })
}

export const findAll = async (walletId?: string) => {
    const whereClause = walletId ? {
        OR: [
            { fromWalletId: walletId },
            { toWalletId: walletId }
        ]
    } : {};
    return await prisma.transaction.findMany({
        where: whereClause,
        orderBy: {
            createdAt: 'desc'
        }
    });
}