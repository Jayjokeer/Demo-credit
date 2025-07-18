import { Request, Response } from 'express';
import   {UserService } from '../services/users.services';
import { successResponse } from '../utilities/success-response';
import { StatusCodes } from 'http-status-codes';
import { ForbiddenError, NotFoundError } from '../errors/error';

export class UserController {
  private userService = new UserService();

  async createUser(req: Request, res: Response) {
    const {email}= req.body;
    const isBlacklisted = await this.userService.isBlacklisted(email);
    if(isBlacklisted){
        throw new ForbiddenError("Your account has been blacklisted and cannot continue with onboarding!")
    };
    const user = await this.userService.createUser(req.body);

    return successResponse(res, StatusCodes.CREATED, user);
  }

  async getUserById(req: Request, res: Response) {
      const user = await this.userService.getUserById(Number(req.params.id));
      if (!user) throw new NotFoundError("user not found!")
    return successResponse(res, StatusCodes.OK, user);

  }


}
