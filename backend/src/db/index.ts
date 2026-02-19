import mongoose from "mongoose";

export const DBConnect = async () => {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}`).then(() => {
      console.log("Mongoose DB connected.........");
    });
  } catch (error) {
    console.log("mongoose Db connection error" + error);
  }
};
