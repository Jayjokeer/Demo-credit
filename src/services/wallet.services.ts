import { WalletModel } from '../models/wallet.model';

export class WalletService {
  async getOrCreateWallet(user_id: number) {
    let wallet = await WalletModel.findByUserId(user_id);
    if (!wallet) {
      wallet = await WalletModel.create({ user_id });
    }
    return wallet;
  }
}