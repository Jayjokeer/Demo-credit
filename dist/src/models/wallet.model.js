"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModel = void 0;
const database_1 = __importDefault(require("../config/database"));
const error_1 = require("../errors/error");
exports.WalletModel = {
    async create(data) {
        return (0, database_1.default)('wallets').insert({ ...data, balance: 0 }).then(res => res[0]);
    },
    async findByUserId(userId) {
        return (0, database_1.default)('wallets').where({ user_id: userId }).first();
    },
    async incrementBalanceByUserId(userId, amount) {
        return (0, database_1.default)('wallets').where({ user_id: userId }).increment('balance', amount);
    },
    async decrementBalanceByUserId(userId, amount) {
        const wallet = await (0, database_1.default)('wallets').where({ user_id: userId }).first();
        if (!wallet || wallet.balance < amount)
            throw new error_1.BadRequestError('Insufficient funds');
        return (0, database_1.default)('wallets').where({ user_id: userId }).decrement('balance', amount);
    }
};
