import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../errors/error';

declare global {
  namespace Express {
    interface Request {
      user: { id: number };
    }
  }
}


export function fakeAuth(req: Request, res: Response, next: NextFunction) {
  const userId = req.header("x-user-id");
  if (!userId) throw new NotFoundError("User ID not found in request header");

  req.user = { id: parseInt(userId) };
  next();
}