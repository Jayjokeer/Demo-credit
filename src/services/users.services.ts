import axios from 'axios';
import { User } from '../interfaces/user.interface';
import {  UserModel } from '../models/users.model';


export class UserService {
  private static readonly baseURL = 'https://api.adjutor.io/v1/validation/karma';
  private static readonly apiKey = process.env.ADJUTOR_API_KEY;

  async createUser(data: User) {
    return UserModel.create(data);
  }

  async isBlacklisted(email: string): Promise<boolean> {
    try {
      const response = await axios.get(UserService.baseURL, {
        headers: {
          Authorization: `Bearer ${UserService.apiKey}`,
        },
        params: { email },
      });

      const records = response.data;
      return Array.isArray(records) && records.length > 0;
    } catch (error: any) {
      console.error('Failed to validate blacklist status with Adjutor:', error.response?.data || error.message);
      return true;
    }
  }

  async getUserByEmail(email: string) {
    return UserModel.findByEmail(email);
  }

  async getUserById(id: number) {
    return UserModel.findById(id);
  }

  async creditUser(id: number, amount: number) {
    return UserModel.incrementBalance(id, amount);
  }

  async debitUser(id: number, amount: number) {
    return UserModel.decrementBalance(id, amount);
  }

  async listUsers() {
    return UserModel.all();
  }

  async deleteUser(id: number) {
    return UserModel.deleteById(id);
  }
}

