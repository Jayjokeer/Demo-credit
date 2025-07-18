
import db from '../config/database';
import { User } from '../interfaces/user.interface';


export const UserModel = {
  async create(user: User): Promise<User> {
    const result = await db('users').insert(user);
    const [id] = Array.isArray(result) ? result : [result];
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