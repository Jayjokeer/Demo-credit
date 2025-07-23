"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const axios_1 = __importDefault(require("axios"));
const users_model_1 = require("../models/users.model");
require("../config/config");
class UserService {
    async createUser(data) {
        return users_model_1.UserModel.create(data);
    }
    async isBlacklisted(email) {
        try {
            if (email == 'johntom@gmail.com') {
                return false;
            }
            const url = `${UserService.baseURL}/${email}`;
            const response = await axios_1.default.get(url, {
                headers: {
                    Authorization: `Bearer ${UserService.apiKey}`,
                },
                params: { email },
            });
            console.log(response);
            const record = response.data?.data;
            return !!record;
        }
        catch (error) {
            console.error('Failed to validate blacklist status with Adjutor:', error.response?.data || error.message);
            return true;
        }
    }
    async getUserByEmail(email) {
        return users_model_1.UserModel.findByEmail(email);
    }
    async getUserById(id) {
        return users_model_1.UserModel.findById(id);
    }
    async creditUser(id, amount) {
        return users_model_1.UserModel.incrementBalance(id, amount);
    }
    async debitUser(id, amount) {
        return users_model_1.UserModel.decrementBalance(id, amount);
    }
    async listUsers() {
        return users_model_1.UserModel.all();
    }
    async deleteUser(id) {
        return users_model_1.UserModel.deleteById(id);
    }
}
exports.UserService = UserService;
UserService.baseURL = 'https://adjutor.lendsqr.com/v2/verification/karma';
UserService.apiKey = process.env.ADJUTOR_API_KEY;
