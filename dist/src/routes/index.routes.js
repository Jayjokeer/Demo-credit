"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = require("./user.routes");
const transactions_routes_1 = require("./transactions.routes");
const router = (0, express_1.Router)();
router.use("/user", user_routes_1.UserRoute);
router.use("/transaction", transactions_routes_1.TransactionRoute);
exports.default = router;
