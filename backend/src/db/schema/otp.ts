import mongoose from "mongoose";

export const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true, trim: true },
  otp: { type: String, required: true, trim: true }
}, { timestamps: true });

OtpSchema.index({ createdAt: 1 }, { expires: 120 })

export const optModel = mongoose.model("Otp", OtpSchema);
