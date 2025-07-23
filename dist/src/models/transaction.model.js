"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = void 0;
const database_1 = __importDefault(require("../config/database"));
exports.TransactionModel = {
    async create(txn) {
        const [id] = await (0, database_1.default)('transactions').insert(txn);
        return { id, ...txn };
    },
    async findByWallet(wallet_id) {
        return (0, database_1.default)('transactions')
            .where('sender_wallet_id', wallet_id)
            .orWhere('receiver_wallet_id', wallet_id)
            .orderBy('created_at', 'desc');
    },
};
