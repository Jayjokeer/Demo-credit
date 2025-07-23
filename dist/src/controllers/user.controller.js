"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const users_services_1 = require("../services/users.services");
const success_response_1 = require("../utilities/success-response");
const http_status_codes_1 = require("http-status-codes");
const error_1 = require("../errors/error");
const encryption_1 = require("../utilities/encryption");
const wallet_services_1 = require("../services/wallet.services");
class UserController {
    constructor() {
        this.userService = new users_services_1.UserService();
        this.walletService = new wallet_services_1.WalletService();
    }
    async createUser(req, res) {
        const { email } = req.body;
        const isBlacklisted = await this.userService.isBlacklisted(email);
        if (isBlacklisted) {
            throw new error_1.ForbiddenError("Your account has been blacklisted and cannot continue with onboarding!");
        }
        ;
        const isUserExists = await this.userService.getUserByEmail(email.toLowerCase());
        if (isUserExists) {
            throw new error_1.BadRequestError("User with this email already exists!");
        }
        ;
        const hashedPwd = await (0, encryption_1.hashPassword)(req.body.password);
        const user = await this.userService.createUser({ ...req.body, password: hashedPwd });
        this.walletService.getOrCreateWallet(Number(user.id));
        return (0, success_response_1.successResponse)(res, http_status_codes_1.StatusCodes.CREATED, user);
    }
    async getUserById(req, res) {
        const userId = req.user?.id;
        const user = await this.userService.getUserById(Number(userId));
        if (!user)
            throw new error_1.NotFoundError("user not found!");
        return (0, success_response_1.successResponse)(res, http_status_codes_1.StatusCodes.OK, user);
    }
}
exports.UserController = UserController;
