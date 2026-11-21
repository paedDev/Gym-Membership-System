import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import errorHandler from "./middlewares/errorHandler.js";
import { AppError } from "./utils/AppError.js";

const app = express();

app.use(helmet);
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
if (env.NODE_ENV !== "test") app.use(morgan("dev"));
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// Routes get mounted here
app.use((req, _res, next) =>
  next(new AppError(`Route ${req.originalUrl} not found`, 404)),
);
app.use(errorHandler);
export default app;
