import { Router } from "express";
import * as walletController from "../controllers/wallet.controller.ts";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Wallet:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         ownerName:
 *           type: string
 *         balance:
 *           type: number
 *           format: decimal
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CreateWalletInput:
 *       type: object
 *       required:
 *         - ownerName
 *       properties:
 *         ownerName:
 *           type: string
 *           example: "John Doe"
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 */

/**
 * @swagger
 * /api/wallets:
 *   post:
 *     summary: Create a new wallet
 *     tags: [Wallets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWalletInput'
 *     responses:
 *       201:
 *         description: Wallet created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wallet'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", walletController.createWallet);

/**
 * @swagger
 * /api/wallets:
 *   get:
 *     summary: Get all wallets
 *     tags: [Wallets]
 *     responses:
 *       200:
 *         description: List of wallets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Wallet'
 */
router.get("/:id", walletController.getWallet);

/**
 * @swagger
 * /api/wallets/{id}:
 *   get:
 *     summary: Get wallet by ID
 *     tags: [Wallets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Wallet ID
 *     responses:
 *       200:
 *         description: Wallet details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wallet'
 *       404:
 *         description: Wallet not found
 */
router.get("/", walletController.getAllWallets);

export default router;