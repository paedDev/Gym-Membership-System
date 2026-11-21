import mongoose from "mongoose";
import app from "./app.js";
import { env } from "./config/env.js";
import connectDB from "./config/db.js";
await connectDB();

const server = app.listen(env.PORT, () =>
  console.log(`Server running on port ${env.PORT}`),
);
const shutdown = () =>
  server.close(() =>
    mongoose.connection.close(false).then(() => process.exit(0)),
  );
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
