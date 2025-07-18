import db from '../config/database';
import { Transaction } from '../interfaces/transaction.interface';



export const TransactionModel = {
  async create(txn: Transaction): Promise<Transaction> {
    const [id] = await db('transactions').insert(txn);
    return { id, ...txn };
  },

  async findByWallet(wallet_id: number): Promise<Transaction[]> {
    return db('transactions').where({ wallet_id }).orderBy('created_at', 'desc');
  },
};
