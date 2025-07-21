import { Request, Response } from 'express';
import {TransactionService} from '../services/transaction.services';
import { successResponse } from '../utilities/success-response';
import { StatusCodes } from 'http-status-codes';

class TransactionController {
  static async fundWallet(req: Request, res: Response) {
      const userId = req.user?.id;
      const { amount } = req.body;
      const result = await TransactionService.fundWallet(userId, amount);
    return successResponse(res, StatusCodes.OK, result);
 
  }

  static async transferFunds(req: Request, res: Response) {
      const senderId = req.user.id;
      const { receiverId, amount } = req.body;
      const result = await TransactionService.transferFunds(senderId, receiverId, amount);
    return successResponse(res, StatusCodes.OK, result);
  }

  static async getUserTransactions(req: Request, res: Response) {
      const {walletId} = req.body;
      const transactions = await TransactionService.getWalletTransactions(walletId);
      return successResponse(res, StatusCodes.OK, transactions);
    }

    static async withdrawFromWallet(req: Request, res: Response) {
        const userId = req.user.id;
        const { amount } = req.body;
        const result = await TransactionService.withdrawFromWallet(userId, amount);
        return successResponse(res, StatusCodes.OK, result);
  }
};

export default TransactionController;