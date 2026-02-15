import mongoose, { mongo } from "mongoose";

export const OtpSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.ObjectId, ref: "Users" },
  otp: { type: String, required: true, trim: true },
}, { timestamps: true });

OtpSchema.index({ createdAt: 1 }, { expires: 120 })

export const optModel = mongoose.model("Otp", OtpSchema);
