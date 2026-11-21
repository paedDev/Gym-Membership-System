import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { env } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { COOKIE_KEY } from "../utils/token.js";

const verifyToken = asyncHandler(async (req, _res, next) => {
  const token = req.cookies?.[COOKIE_KEY];
  if (!token) throw new AppError("Not authenticated", 401);

  let payload;
  try {
    payload = jwt.verify(token, env.JWT_SECRET);
  } catch (err) {
    throw new AppError(
      err.name === "TokenExpiredError"
        ? "Session expired, please sign in again"
        : "Invalid token",
      401,
    );
  }

  const user = await User.findById(payload.sub);
  if (!user || !user.isActive)
    throw new AppError("Account not found or disabled", 401);

  req.user = user; // full document: req.user.id, req.user.role
  next();
});

export default verifyToken;
