import { ZodError } from "zod";
import { env } from "../config/env.js";

const errorHandler = (err, _req, res, _next) => {
  let status = err.statusCode || 500;
  let message = err.message || "Server error";
  let errors;

  if (err instanceof ZodError) {
    status = 400;
    message = "Validation failed";
    errors = err.flatten().fieldErrors;
  } else if (err.code === 11000) {
    status = 409;
    message = `${Object.keys(err.keyValue)[0]} already exists`;
  } else if (err.name === "CastError") {
    status = 400;
    message = "Invalid id";
  } else if (err.name === "ValidationError") {
    status = 400;
  }

  if (status >= 500) console.error(err);

  res.status(status).json({
    success: false,
    message:
      status >= 500 && env.NODE_ENV === "production"
        ? "Internal server error"
        : message,
    ...(errors && { errors }),
  });
};

export default errorHandler;
