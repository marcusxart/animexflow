import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.ts";
import logger from "../utils/logger.ts";

/**
 * Global error handling middleware
 */
const globalErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  // If error is our AppError, use its status/message
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);
  logger.error(err.stack || "No stack trace");

  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

export default globalErrorHandler;
