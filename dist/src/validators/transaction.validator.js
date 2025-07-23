"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawFromWalletSchema = exports.transferFundsSchema = exports.fundWalletSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.fundWalletSchema = joi_1.default.object({
    amount: joi_1.default.number().positive().required(),
});
exports.transferFundsSchema = joi_1.default.object({
    receiverId: joi_1.default.number().integer().required(),
    amount: joi_1.default.number().positive().required(),
});
exports.withdrawFromWalletSchema = joi_1.default.object({
    amount: joi_1.default.number().positive().required(),
});
