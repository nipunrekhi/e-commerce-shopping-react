// Define a custom middleware function for error handling
function errorHandler(err, req, res, next) {
  // Check if the error has a status code, default to 500
  const statusCode = err.statusCode || 500;
  // Send an error response to the client
  res.status(statusCode).json({
    status: "error",
    statusCode: statusCode,
    message: err.message,
    stack: err.stack,
  });
}

// Define a custom middleware function for handling not found errors
function notFound(req, res, next) {
  // Create a new error object with a 404 status code
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  // Pass the error to the next middleware function
  next(error);
}

// Define a custom middleware function for handling validation errors
function validationError(err, req, res, next) {
  // Check if the error is a validation error
  if (err.name === "ValidationError") {
    // Set the status code to 422 (Unprocessable Entity)
    err.statusCode = 422;
    // Send an error response to the client with details of the validation error
    res.status(err.statusCode).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
    });
  } else {
    // Pass the error to the next middleware function
    next(err);
  }
}

// Define a custom middleware function for handling authentication errors
function authenticationError(err, req, res, next) {
  // Check if the error is an authentication error
  if (err.name === "AuthenticationError") {
    // Set the status code to 401 (Unauthorized)
    err.statusCode = 401;
    // Send an error response to the client with details of the authentication error
    res.status(err.statusCode).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
    });
  } else {
    // Pass the error to the next middleware function
    next(err);
  }
}

export { notFound, authenticationError, errorHandler, validationError };
