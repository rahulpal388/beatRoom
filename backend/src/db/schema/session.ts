import mongoose from "mongoose"


const userSession = new mongoose.Schema({
    id: { type: mongoose.SchemaTypes.ObjectId, require: true, ref: "Users" },
    refreshToken: { type: String, require: true },
    deviceId: { type: String, require: true },
    userAgent: { type: String, require: true },
    ipAddress: { type: String, require: true },
    expiresAt: { type: String, require: true },
    revoked: { type: Boolean, default: false }
}, { timestamps: true })


export const sessionModal = mongoose.model("Session", userSession);