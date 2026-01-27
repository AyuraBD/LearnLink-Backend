import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = 500;
  let errorMessage = "Internal server error";
  let errorDetails = err;

  // Prisma Validation Error
  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "Invalid or missing input fields.";
  }

  // Prisma Known Request Errors
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2000":
        statusCode = 400;
        errorMessage = "Input value is too long for a field.";
        break;

      case "P2001":
      case "P2025":
        statusCode = 404;
        errorMessage = "Requested resource not found.";
        break;

      case "P2002":
        statusCode = 409;
        errorMessage = "Duplicate value. This record already exists.";
        break;

      case "P2003":
        statusCode = 400;
        errorMessage = "Invalid reference. Related record not found.";
        break;

      case "P2014":
        statusCode = 400;
        errorMessage = "Invalid relation between records.";
        break;

      default:
        statusCode = 400;
        errorMessage = "Database request error.";
    }
  }

  // Unknown Prisma Error
  else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errorMessage = "Unexpected database error occurred.";
  }

  // Prisma Engine Panic
  else if (err instanceof Prisma.PrismaClientRustPanicError) {
    statusCode = 500;
    errorMessage = "Database engine crashed.";
  }

  // Prisma Initialization Errors
  else if (err instanceof Prisma.PrismaClientInitializationError) {
    switch (err.errorCode) {
      case "P1000":
        statusCode = 401;
        errorMessage = "Database authentication failed.";
        break;

      case "P1001":
        statusCode = 503;
        errorMessage = "Cannot connect to the database server.";
        break;

      case "P1002":
        statusCode = 504;
        errorMessage = "Database connection timed out.";
        break;

      case "P1017":
        statusCode = 503;
        errorMessage = "Database server closed the connection.";
        break;

      default:
        statusCode = 500;
        errorMessage = "Database initialization error.";
    }
  }

  res.status(statusCode);
  res.json({
    message: errorMessage,
    error: errorDetails
  });
}

export default errorHandler;
