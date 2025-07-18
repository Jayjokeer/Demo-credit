import { Response } from "express";

export const successResponse = (
    res: Response,
    statusCode: number,
    data?: any,
  ) => {
    return res.status(statusCode).json({
      message: "Successful",
      code: statusCode,
      status: "success",
      data,
    });
  };
  