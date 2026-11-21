import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
export const COOKIE_KEY = "jwt";
export const cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "strict",
};

export const signToken = (userId) =>
  jwt.sign({ sub: userId }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
export const setAuthCookie = (res, token) =>
  res.cookie(COOKIE_KEY, token, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
export const clearAuthCookie = (res) =>
  res.clearCookie(COOKIE_KEY, cookieOptions);
