"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRoute = void 0;
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = require("../controllers/transaction.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const error_handler_1 = require("../errors/error-handler");
const validate_request_middleware_1 = require("../middlewares/validate-request.middleware");
const transaction_validator_1 = require("../validators/transaction.validator");
const router = express_1.default.Router();
exports.TransactionRoute = router;
const transactionController = new transaction_controller_1.TransactionController();
router.post('/fund', auth_middleware_1.fakeAuth, (0, validate_request_middleware_1.validateRequest)(transaction_validator_1.fundWalletSchema), (0, error_handler_1.catchAsync)(transactionController.fundWallet.bind(transactionController)));
router.post('/transfer', auth_middleware_1.fakeAuth, (0, validate_request_middleware_1.validateRequest)(transaction_validator_1.transferFundsSchema), (0, error_handler_1.catchAsync)(transactionController.transferFunds.bind(transactionController)));
router.post('/withdraw', auth_middleware_1.fakeAuth, (0, validate_request_middleware_1.validateRequest)(transaction_validator_1.withdrawFromWalletSchema), (0, error_handler_1.catchAsync)(transactionController.withdrawFromWallet.bind(transactionController)));
