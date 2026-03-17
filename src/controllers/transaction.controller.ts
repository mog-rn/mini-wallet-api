import type { Request, Response, NextFunction } from "express";
import * as transactionService from "../services/transaction.services.ts";
import z from "zod";
import { BadRequestError } from "../utils/error.ts";

const depositSchema = z.object({
    walletId: z.uuid("Invalid wallet ID"),
    amount: z.number()
    .positive("Amount must be greater than zero")
    .max(1_000_000, "Amount exceeds maximum limit."),
    reference: z.string()
    .optional(),
})

const transferSchema = z.object({
    fromWalletId: z.uuid("Invalid sender wallet ID"),
    toWalletId: z.uuid("Invalid receiver wallet ID"),
    amount: z.number()
    .positive("Amount must be greater than zero")
    .max(1_000_000, "Amount exceeds maximum limit."),
    reference: z.string()
    .optional(),
})

export const deposit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = depositSchema.safeParse(req.body);
        if (!result.success) {
            throw new BadRequestError(result.error.issues.map(issue => issue.message).join(", "));
        }
        const transaction = await transactionService.deposit(result.data.walletId, result.data.amount, result.data.reference);
        res.status(201).json(transaction);
    
    } catch (error) {
        next(error);
    }
}

export const transfer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = transferSchema.safeParse(req.body);
        if (!result.success) {
            throw new BadRequestError(result.error.issues.map(issue => issue.message).join(", "));
        }
        const transaction = await transactionService.transfer(result.data.fromWalletId, result.data.toWalletId, result.data.amount, result.data.reference);
        res.status(201).json(transaction);
    } catch (error) {
        next(error);
    }
}

export const getTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const walletId = req.query.walletId as string;
        const transactions = await transactionService.findAll(walletId);
        res.status(200).json(transactions);
    } catch (error) {
        next(error);
    }
}


