import mongoose from "mongoose";
import { env } from "./env.js";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(env.MONGO_URI);
    console.log(`MongoDb connected: ${connect.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDb;
