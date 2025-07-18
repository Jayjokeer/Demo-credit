import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { id: number };
    }
  }
}


export function fakeAuth(req: Request, res: Response, next: NextFunction) {
  const userId = req.header("x-user-id");
  if (!userId) return res.status(401).json({ message: "No user ID provided" });

  req.user = { id: parseInt(userId) };
  next();
}