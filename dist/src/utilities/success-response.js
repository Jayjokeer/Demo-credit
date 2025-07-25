"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = void 0;
const successResponse = (res, statusCode, data) => {
    return res.status(statusCode).json({
        message: "Successful",
        code: statusCode,
        status: "success",
        data,
    });
};
exports.successResponse = successResponse;
