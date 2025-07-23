"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const transaction_model_1 = require("../models/transaction.model");
const database_1 = __importDefault(require("../config/database"));
const wallet_model_1 = require("../models/wallet.model");
const transaction_enum_1 = require("../enums/transaction.enum");
const error_1 = require("../errors/error");
class TransactionService {
    async logTransaction(txn) {
        return transaction_model_1.TransactionModel.create(txn);
    }
    async fundWallet(userId, amount) {
        const wallet = await wallet_model_1.WalletModel.findByUserId(userId);
        return database_1.default.transaction(async (trx) => {
            await trx('wallets').where({ id: wallet.id }).increment('balance', amount);
            await trx('transactions').insert({
                receiver_wallet_id: wallet.id,
                type: transaction_enum_1.TransactionType.FUND,
                amount,
                status: transaction_enum_1.TransactionStatus.SUCCESS,
            });
            return { balance: Number(wallet.balance) + amount };
        });
    }
    async withdrawFromWallet(userId, amount) {
        const wallet = await wallet_model_1.WalletModel.findByUserId(userId);
        if (wallet.balance < amount)
            throw new error_1.BadRequestError('Insufficient funds');
        return database_1.default.transaction(async (trx) => {
            await trx('wallets').where({ id: wallet.id }).decrement('balance', amount);
            await trx('transactions').insert({
                sender_wallet_id: wallet.id,
                type: transaction_enum_1.TransactionType.WITHDRAW,
                amount,
                status: transaction_enum_1.TransactionStatus.SUCCESS,
            });
            return { balance: Number(wallet.balance) - amount };
        });
    }
    async transferFunds(senderUserId, receiverUserId, amount) {
        const senderWallet = await wallet_model_1.WalletModel.findByUserId(senderUserId);
        const receiverWallet = await wallet_model_1.WalletModel.findByUserId(receiverUserId);
        if (senderWallet.balance < amount)
            throw new error_1.BadRequestError('Insufficient funds');
        return database_1.default.transaction(async (trx) => {
            await trx('wallets').where({ id: senderWallet.id }).decrement('balance', amount);
            await trx('wallets').where({ id: receiverWallet.id }).increment('balance', amount);
            await trx('transactions').insert({
                sender_wallet_id: senderWallet.id,
                receiver_wallet_id: receiverWallet.id,
                type: transaction_enum_1.TransactionType.TRANSFER,
                amount,
                status: transaction_enum_1.TransactionStatus.SUCCESS,
            });
            return {
                senderBalance: senderWallet.balance - amount,
                receiverBalance: Number(receiverWallet.balance) + amount,
            };
        });
    }
}
exports.TransactionService = TransactionService;
