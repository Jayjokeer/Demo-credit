"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
const error_1 = __importDefault(require("./error"));
require("../config/config");
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => next(err));
    };
};
exports.catchAsync = catchAsync;
const globalErrorHandler = (err, req, res, next) => {
    if (!(err instanceof error_1.default)) {
        err = new error_1.default(err.message || 'Internal Server Error', 500);
    }
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        message: err.message,
        code: err.statusCode,
        status: err.status,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};
exports.default = globalErrorHandler;
