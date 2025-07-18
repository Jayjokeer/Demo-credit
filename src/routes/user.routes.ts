import express from 'express';
import { UserController } from '../controllers/user.controller';
import { catchAsync } from '../errors/error-handler';

const router = express.Router();
const userController = new UserController();

router.post('/users', catchAsync(userController.createUser.bind(userController)));
router.get('/users/:id', catchAsync(userController.getUserById.bind(userController)));

export { router as UserRoute };
