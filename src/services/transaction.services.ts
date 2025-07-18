import { Transaction } from '../interfaces/transaction.interface';
import { TransactionModel } from '../models/transaction.model';

export class TransactionService {
  async logTransaction(txn: Transaction) {
    return TransactionModel.create(txn);
  }

  async getWalletTransactions(wallet_id: number) {
    return TransactionModel.findByWallet(wallet_id);
  }
}