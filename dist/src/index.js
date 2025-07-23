"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_1 = __importDefault(require("./errors/error"));
const error_handler_1 = __importDefault(require("./errors/error-handler"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
require("./config/config");
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1', index_routes_1.default);
app.all('/*splat', (req, res, next) => {
    next(new error_1.default(`Cannot find ${req.originalUrl} on this server`, 404));
});
app.use(error_handler_1.default);
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
exports.default = app;
