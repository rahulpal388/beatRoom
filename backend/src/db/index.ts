import mongoose from "mongoose";

export const DBConnect = async () => {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}`).then(() => {
      console.log("Db connected successfully");
    });
  } catch (error) {
    console.error("mongoose Db connection error" + error);
  }
};
