/**
 * Base application error class
 */
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  /**
   * @param message - Error message
   * @param statusCode - HTTP status code
   * @param isOperational - Whether error is operational
   */
  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

/**
 * 400 Bad Request Error
 */
export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

/**
 * 401 Unauthorized Error
 */
export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}

/**
 * 403 Forbidden Error
 */
export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, 403);
  }
}

/**
 * 404 Not Found Error
 */
export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

/**
 * 409 Conflict Error
 */
export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}

/**
 * 500 Internal Server Error
 */
export class InternalServerError extends AppError {
  constructor(message: string) {
    super(message, 500, false);
  }
}
