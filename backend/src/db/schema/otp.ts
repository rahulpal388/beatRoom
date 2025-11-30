import mongoose, { mongo } from "mongoose";

export const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true, trim: true },
  otp: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now, expire: 120 },
});

export const optModel = mongoose.model("Otp", OtpSchema);
