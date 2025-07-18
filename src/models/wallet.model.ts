import db from '../config/database';
import { Wallet } from '../interfaces/wallet.interface';


export const WalletModel = {
  async create(wallet: Wallet): Promise<Wallet> {
    const [id] = await db('wallets').insert(wallet);
    return { id, ...wallet };
  },

  async findByUserId(user_id: number): Promise<Wallet | undefined> {
    return db('wallets').where({ user_id }).first();
  },

  async updateBalance(id: number, newBalance: number): Promise<void> {
    await db('wallets').where({ id }).update({ balance: newBalance });
  },

  async incrementBalance(id: number, amount: number): Promise<void> {
    await db('wallets').where({ id }).increment('balance', amount);
  },

  async decrementBalance(id: number, amount: number): Promise<void> {
    await db('wallets').where({ id }).decrement('balance', amount);
  },
};
