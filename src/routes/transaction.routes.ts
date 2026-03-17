import { Router } from "express";
import * as transactionController from "../controllers/transaction.controller.ts";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         type:
 *           type: string
 *           enum: [DEPOSIT, TRANSFER]
 *         amount:
 *           type: number
 *           format: decimal
 *         status:
 *           type: string
 *           enum: [SUCCESSFUL, FAILED]
 *         reference:
 *           type: string
 *           nullable: true
 *         fromWalletId:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         toWalletId:
 *           type: string
 *           format: uuid
 *         createdAt:
 *           type: string
 *           format: date-time
 *     DepositInput:
 *       type: object
 *       required:
 *         - walletId
 *         - amount
 *       properties:
 *         walletId:
 *           type: string
 *           format: uuid
 *           example: "uuid-here"
 *         amount:
 *           type: number
 *           example: 1000.00
 *         reference:
 *           type: string
 *           example: "Initial deposit"
 *     TransferInput:
 *       type: object
 *       required:
 *         - fromWalletId
 *         - toWalletId
 *         - amount
 *       properties:
 *         fromWalletId:
 *           type: string
 *           format: uuid
 *         toWalletId:
 *           type: string
 *           format: uuid
 *         amount:
 *           type: number
 *           example: 500.00
 *         reference:
 *           type: string
 *           example: "Payment for goods"
 */

/**
 * @swagger
 * /api/transactions/deposit:
 *   post:
 *     summary: Deposit funds into a wallet
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DepositInput'
 *     responses:
 *       201:
 *         description: Deposit successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Wallet not found
 */
router.post("/deposit", transactionController.deposit);

/**
 * @swagger
 * /api/transactions/transfer:
 *   post:
 *     summary: Transfer funds between wallets
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransferInput'
 *     responses:
 *       201:
 *         description: Transfer successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Insufficient balance or invalid input
 *       404:
 *         description: Wallet not found
 */
router.post("/transfer", transactionController.transfer);

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     parameters:
 *       - in: query
 *         name: walletId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by wallet ID
 *     responses:
 *       200:
 *         description: List of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 */
router.get("/", transactionController.getTransactions);

export default router;