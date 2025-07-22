import { Request, Response } from 'express';
import {TransactionService} from '../services/transaction.services';
import { successResponse } from '../utilities/success-response';
import { StatusCodes } from 'http-status-codes';

export class TransactionController {
  private readonly transactionService = new TransactionService();
  async fundWallet(req: Request, res: Response) {
      const userId = req.user?.id;
      const { amount } = req.body;
      const result = await this.transactionService.fundWallet(userId, amount);
    return successResponse(res, StatusCodes.OK, result);
 
  }

  async transferFunds(req: Request, res: Response) {
      const senderId = req.user.id;
      const { receiverId, amount } = req.body;
      const result = await this.transactionService.transferFunds(senderId, receiverId, amount);
    return successResponse(res, StatusCodes.OK, result);
  }

    async withdrawFromWallet(req: Request, res: Response) {
        const userId = req.user.id;
        const { amount } = req.body;
        const result = await this.transactionService.withdrawFromWallet(userId, amount);
        return successResponse(res, StatusCodes.OK, result);
  }
};

export default TransactionController;