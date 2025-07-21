import { Request, Response } from 'express';
import   {UserService } from '../services/users.services';
import { successResponse } from '../utilities/success-response';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, ForbiddenError, NotFoundError } from '../errors/error';
import { hashPassword } from '../utilities/encryption';

export class UserController {
  private userService = new UserService();

  async createUser(req: Request, res: Response) {
    const {email}= req.body;
    const isBlacklisted = await this.userService.isBlacklisted(email);
    if(isBlacklisted){
        throw new ForbiddenError("Your account has been blacklisted and cannot continue with onboarding!")
    };
    const isUserExists = await this.userService.getUserByEmail(email);
    if (isUserExists) {
      throw new BadRequestError("User with this email already exists!");
    };
    const hashedPwd =  await hashPassword(req.body.password);
    const user = await this.userService.createUser({...req.body, password: hashedPwd});

    return successResponse(res, StatusCodes.CREATED, user);
  }

  async getUserById(req: Request, res: Response) {
      const user = await this.userService.getUserById(Number(req.params.id));
      if (!user) throw new NotFoundError("user not found!")
    return successResponse(res, StatusCodes.OK, user);

  }
}
