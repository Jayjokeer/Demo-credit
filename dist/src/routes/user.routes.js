"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const error_handler_1 = require("../errors/error-handler");
const validate_request_middleware_1 = require("../middlewares/validate-request.middleware");
const user_validator_1 = require("../validators/user.validator");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
exports.UserRoute = router;
const userController = new user_controller_1.UserController();
router.get('/home', (req, res, next) => {
    return res.json("Welcome to johns Lendsqr assessment");
});
router.post('/create-user', (0, validate_request_middleware_1.validateRequest)(user_validator_1.createUserSchema), (0, error_handler_1.catchAsync)(userController.createUser.bind(userController)));
router.get('/', auth_middleware_1.fakeAuth, (0, error_handler_1.catchAsync)(userController.getUserById.bind(userController)));
