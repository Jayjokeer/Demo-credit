"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeAuth = fakeAuth;
const error_1 = require("../errors/error");
function fakeAuth(req, res, next) {
    const userId = req.header("x-user-id");
    if (!userId)
        throw new error_1.NotFoundError("User ID not found in request header");
    req.user = { id: parseInt(userId) };
    next();
}
