import { Request, Response, NextFunction } from 'express';
import AppError from './error';
import '../config/config';

export const catchAsync = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: any) => next(err)); 
  };
};
const globalErrorHandler = (
  err: AppError, 
  req: Request, 
  res: Response, 
  next: NextFunction 
) => {

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    message: err.message,
    code: err.statusCode,
    status: err.status,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default globalErrorHandler;