import mongoose from "mongoose";

export const DBConnect = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(process.env.DATABASE_URL!);
  console.log("DB connected successfully");
};
