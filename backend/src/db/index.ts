
import mongoose from "mongoose";
import { env } from "../zodTypes/envType.js";

export const DBConnect = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(env.DATABASE_URL);
  console.log("DB connected successfully");
};

