const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transactions');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - text
 *         - amount
 *         - type
 *       properties:
 *         text:
 *           type: string
 *           description: Description of the transaction
 *         amount:
 *           type: number
 *           description: Amount (positive for income, negative for expense)
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           description: Transaction type
 *         category:
 *           type: string
 *           description: Category of the transaction
 */

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions for the logged in user
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions
 *   post:
 *     summary: Add a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       400:
 *         description: Validation error
 */
router
  .route('/')
  .get(protect, getTransactions)
  .post(protect, addTransaction);

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction id
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       401:
 *         description: User not authorized
 *       404:
 *         description: No transaction found
 */
router
  .route('/:id')
  .delete(protect, deleteTransaction);

module.exports = router;
