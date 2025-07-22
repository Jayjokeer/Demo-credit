import express from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { fakeAuth } from '../middlewares/auth.middleware';
import { catchAsync } from '../errors/error-handler';
import { validateRequest } from '../middlewares/validate-request.middleware';
import { fundWalletSchema, transferFundsSchema, withdrawFromWalletSchema } from '../validators/transaction.validator';

const router = express.Router();
const transactionController = new TransactionController();

router.post('/fund', fakeAuth, validateRequest(fundWalletSchema), catchAsync(transactionController.fundWallet.bind(transactionController)));
router.post('/transfer', fakeAuth, validateRequest(transferFundsSchema ), catchAsync(transactionController.transferFunds.bind(transactionController)));
router.post('/withdraw', fakeAuth, validateRequest(withdrawFromWalletSchema ), catchAsync(transactionController.withdrawFromWallet.bind(transactionController)));

export { router as TransactionRoute };
    