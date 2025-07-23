"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_1 = __importDefault(require("../config/database"));
exports.UserModel = {
    async create(user) {
        const [id] = await (0, database_1.default)('users').insert(user);
        return { ...user, id: String(id) };
    },
    async findById(id) {
        return (0, database_1.default)('users').where({ id }).first();
    },
    async findByEmail(email) {
        return (0, database_1.default)('users').where({ email }).first();
    },
    async incrementBalance(id, amount) {
        await (0, database_1.default)('users').where({ id }).increment('wallet_balance', amount);
    },
    async decrementBalance(id, amount) {
        await (0, database_1.default)('users').where({ id }).decrement('wallet_balance', amount);
    },
    async updateBalance(id, newBalance) {
        await (0, database_1.default)('users').where({ id }).update({ wallet_balance: newBalance });
    },
    async deleteById(id) {
        await (0, database_1.default)('users').where({ id }).del();
    },
    async all() {
        return (0, database_1.default)('users').select('*');
    },
};
