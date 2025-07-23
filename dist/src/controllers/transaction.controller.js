"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const transaction_services_1 = require("../services/transaction.services");
const success_response_1 = require("../utilities/success-response");
const http_status_codes_1 = require("http-status-codes");
class TransactionController {
    constructor() {
        this.transactionService = new transaction_services_1.TransactionService();
    }
    async fundWallet(req, res) {
        const userId = req.user?.id;
        const { amount } = req.body;
        const result = await this.transactionService.fundWallet(userId, amount);
        return (0, success_response_1.successResponse)(res, http_status_codes_1.StatusCodes.OK, result);
    }
    async transferFunds(req, res) {
        const senderId = req.user.id;
        const { receiverId, amount } = req.body;
        const result = await this.transactionService.transferFunds(senderId, receiverId, amount);
        return (0, success_response_1.successResponse)(res, http_status_codes_1.StatusCodes.OK, result);
    }
    async withdrawFromWallet(req, res) {
        const userId = req.user.id;
        const { amount } = req.body;
        const result = await this.transactionService.withdrawFromWallet(userId, amount);
        return (0, success_response_1.successResponse)(res, http_status_codes_1.StatusCodes.OK, result);
    }
}
exports.TransactionController = TransactionController;
;
exports.default = TransactionController;
