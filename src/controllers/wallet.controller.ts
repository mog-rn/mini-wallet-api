import type { Request, Response, NextFunction } from "express";
import * as walletService from "../services/wallet.services.ts";
import {z} from "zod";
import { BadRequestError } from "../utils/error.ts";

const createWalletSchema = z.object({
    ownerName: z.string()
    .min(1, "Owner name is required")
    .max(255, "Owner name must be less than 255 characters")
    .trim()
});


export const createWallet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = createWalletSchema.safeParse(req.body);

        if (!result.success) {
            throw new BadRequestError(result.error.issues.map(issue => issue.message).join(", "));
        }

        const wallet = await walletService.create(result.data.ownerName);

        res.status(201).json(wallet);
    } catch (error) {
        next(error);
        
    }
}

export const getWallet = async (req: Request<{ id: string}>, res: Response, next: NextFunction) => {
    try {
        const wallet = await walletService.findOne(req.params.id);
        res.status(200).json(wallet);
    } catch (error) {
        next(error);
    }
}

export const getAllWallets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const wallets = await walletService.findAll();
        res.status(200).json(wallets);
    } catch (error) {
        next(error);
    }   
}
