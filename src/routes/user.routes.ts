import express from 'express';
import { UserController } from '../controllers/user.controller';
import { catchAsync } from '../errors/error-handler';
import { validateRequest } from '../middlewares/validate-request.middleware';
import { createUserSchema } from '../validators/user.validator';
import { fakeAuth } from '../middlewares/auth.middleware';

const router = express.Router();
const userController = new UserController();

router.get('/home', (req, res, next)=>{
    return res.json("Welcome to johns Lendsqr assessment")
})
router.post('/create-user', validateRequest(createUserSchema),catchAsync(userController.createUser.bind(userController)));
router.get('/',fakeAuth, catchAsync(userController.getUserById.bind(userController)));

export { router as UserRoute };
