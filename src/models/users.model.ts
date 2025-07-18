
import db from '../config/database';

export interface User {
  id?: number;
  name: string;
  email: string;
  wallet_balance?: number;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
}

export const UserModel = {
  async create(user: User): Promise<User> {
    const [id] = await db('users').insert(user);
    return { id, ...user };
  },

  async findById(id: number): Promise<User | undefined> {
    return db('users').where({ id }).first();
  },

  async findByEmail(email: string): Promise<User | undefined> {
    return db('users').where({ email }).first();
  },

  async incrementBalance(id: number, amount: number): Promise<void> {
    await db('users').where({ id }).increment('wallet_balance', amount);
  },

  async decrementBalance(id: number, amount: number): Promise<void> {
    await db('users').where({ id }).decrement('wallet_balance', amount);
  },

  async updateBalance(id: number, newBalance: number): Promise<void> {
    await db('users').where({ id }).update({ wallet_balance: newBalance });
  },

  async deleteById(id: number): Promise<void> {
    await db('users').where({ id }).del();
  },

  async all(): Promise<User[]> {
    return db('users').select('*');
  },
};
