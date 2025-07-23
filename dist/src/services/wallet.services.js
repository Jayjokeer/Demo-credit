"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const wallet_model_1 = require("../models/wallet.model");
class WalletService {
    async getOrCreateWallet(user_id) {
        let wallet = await wallet_model_1.WalletModel.findByUserId(user_id);
        if (!wallet) {
            wallet = await wallet_model_1.WalletModel.create({ user_id });
        }
        return wallet;
    }
}
exports.WalletService = WalletService;
