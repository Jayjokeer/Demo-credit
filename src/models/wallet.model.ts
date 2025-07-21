import db from '../config/database';
import { BadRequestError } from '../errors/error';

export const WalletModel = {
  async create(data: { user_id: number }) {
    return db('wallets').insert({ ...data, balance: 0 }).returning('*').then(res => res[0]);
  },

  async findByUserId(userId: number) {
    return db('wallets').where({ user_id: userId }).first();
  },

  async incrementBalanceByUserId(userId: number, amount: number) {
    return db('wallets').where({ user_id: userId }).increment('balance', amount);
  },

  async decrementBalanceByUserId(userId: number, amount: number) {
    const wallet = await db('wallets').where({ user_id: userId }).first();
    if (!wallet || wallet.balance < amount) throw new BadRequestError('Insufficient funds');
    return db('wallets').where({ user_id: userId }).decrement('balance', amount);
  }
};
