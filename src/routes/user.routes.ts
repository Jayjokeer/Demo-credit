import express from 'express';
import { UserController } from '../controllers/user.controller';
import { catchAsync } from '../errors/error-handler';

const router = express.Router();
const userController = new UserController();

router.get('/home', (req, res, next)=>{
    return res.json("Welcome to johns Lendsqr assessment")
})
router.post('/create-user', catchAsync(userController.createUser.bind(userController)));
router.get('/user/:id', catchAsync(userController.getUserById.bind(userController)));

export { router as UserRoute };
