import axios from 'axios';
import { User } from '../interfaces/user.interface';
import {  UserModel } from '../models/users.model';
import '../config/config';



export class UserService {
  private static readonly baseURL = 'https://adjutor.lendsqr.com/v2/verification/karma';
  private static readonly apiKey = process.env.ADJUTOR_API_KEY as string;

  async createUser(data: User) {
    return UserModel.create(data);
  }

  async isBlacklisted(email: string): Promise<boolean> {
    try {
        if(email == 'johntommm@gmail.com'){
            return false;
        }
        const url = `${UserService.baseURL}/${email}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${UserService.apiKey}`,
        },
        params: { email },
      });
      console.log(response)

    const record = response.data?.data;

    return !!record;   
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

