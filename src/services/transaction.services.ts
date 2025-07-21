import { Transaction } from '../interfaces/transaction.interface';
import { TransactionModel } from '../models/transaction.model';
import db from '../config/database';
import { WalletModel } from '../models/wallet.model'; 
import { TransactionStatus, TransactionType } from '../enums/transaction.enum';
import { BadRequestError } from '../errors/error';

export class TransactionService {
  async logTransaction(txn: Transaction) {
    return TransactionModel.create(txn);
  }

  async getWalletTransactions(wallet_id: number) {
    return TransactionModel.findByWallet(wallet_id);
  }

  static async fundWallet(userId: number, amount: number) {
    const wallet = await WalletModel.findByUserId(userId);

    return db.transaction(async (trx) => {
      await trx('wallets').where({ id: wallet.id }).increment('balance', amount);

      await trx('transactions').insert({
        receiver_wallet_id: wallet.id,
        type: TransactionType.FUND,
        amount,
        status: TransactionStatus.SUCCESS,
      });

      return { balance: Number(wallet.balance) + amount };
    });
  }

  static async withdrawFromWallet(userId: number, amount: number) {
    const wallet = await WalletModel.findByUserId(userId);
    if (wallet.balance < amount) throw new BadRequestError('Insufficient funds');

    return db.transaction(async (trx) => {
      await trx('wallets').where({ id: wallet.id }).decrement('balance', amount);

      await trx('transactions').insert({
        sender_wallet_id: wallet.id,
        type: TransactionType.WITHDRAW,
        amount,
        status: TransactionStatus.SUCCESS,
      });

      return { balance: Number(wallet.balance) - amount };
    });
  }

  static async transferFunds(senderUserId: number, receiverUserId: number, amount: number) {
    const senderWallet = await WalletModel.findByUserId(senderUserId);
    const receiverWallet = await WalletModel.findByUserId(receiverUserId);
    if (senderWallet.balance < amount) throw new BadRequestError('Insufficient funds');

    return db.transaction(async (trx) => {
      await trx('wallets').where({ id: senderWallet.id }).decrement('balance', amount);
      await trx('wallets').where({ id: receiverWallet.id }).increment('balance', amount);

      await trx('transactions').insert({
        sender_wallet_id: senderWallet.id,
        receiver_wallet_id: receiverWallet.id,
        type: TransactionType.TRANSFER,
        amount,
        status: TransactionStatus.SUCCESS,
      });

      return {
        senderBalance: senderWallet.balance - amount,
        receiverBalance: receiverWallet.balance + amount,
      };
    });
  }
}