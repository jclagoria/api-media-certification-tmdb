class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public statusCode: number = 0,
    public isOperational: boolean = true,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

class NotFoundError extends ApiError {
  constructor(message: string = 'Resource not found') {
    super(404, message);
  }
}

class ServiceError extends ApiError {
  constructor(status: number, message: string, statusCode: number) {
    super(status, message, statusCode);
  }
}

export { ApiError, NotFoundError, ServiceError };
