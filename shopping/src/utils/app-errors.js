const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

class AppError extends Error {
  constructor(
    name,
    statusCode,
    description,
    isOperational,
    errorStack,
    logingErrorResponse
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logError = logingErrorResponse;
    Error.captureStackTrace(this);
  }
}

// const AppError = {
//   create(
//     name,
//     statusCode,
//     description,
//     isOperational,
//     errorStack,
//     logingErrorResponse
//   ) {
//     const error = new Error(description);
//     Object.setPrototypeOf(error, AppError);
//     error.name = name;
//     error.statusCode = statusCode;
//     error.isOperational = isOperational;
//     error.errorStack = errorStack;
//     error.logError = logingErrorResponse;
//     Error.captureStackTrace(error);
//     return error;
//   },
// };

//api Specific Errors
class APIError extends AppError {
  constructor(
    name,
    statusCode = STATUS_CODES.INTERNAL_ERROR,
    description = "Internal Server Error",
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational);
  }
}

//const APIError = Object.create(AppError);
// APIError.create = function(name, statusCode = STATUS_CODES.INTERNAL_ERROR, description = "Internal Server Error", isOperational = true) {
//   return AppError.create(name, statusCode, description, isOperational);
// };


//400
class BadRequestError extends AppError {
  constructor(description = "Bad request", logingErrorResponse) {
    super(
      "NOT FOUND",
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      false,
      logingErrorResponse
    );
  }
}

// const BadRequestError = Object.create(AppError);

// BadRequestError.create = function (
//   description = "Bad request",
//   logingErrorResponse
// ) {
//   return AppError.create(
//     "NOT FOUND",
//     STATUS_CODES.BAD_REQUEST,
//     description,
//     true,
//     false,
//     logingErrorResponse
//   );
// };

//400
class ValidationError extends AppError {
  constructor(description = "Validation Error", errorStack) {
    super(
      "BAD REQUEST",
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      errorStack
    );
  }
}

// const ValidationError = Object.create(AppError);

// ValidationError.create = function (
//   description = "Validation Error",
//   errorStack
// ) {
//   return AppError.create(
//     "BAD REQUEST",
//     STATUS_CODES.BAD_REQUEST,
//     description,
//     true,
//     errorStack
//   );
// };

module.exports = {
  AppError,
  APIError,
  BadRequestError,
  ValidationError,
  STATUS_CODES,
};
