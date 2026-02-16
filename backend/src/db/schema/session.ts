import mongoose from "mongoose"


const userSession = new mongoose.Schema({
    refToken: { type: String, require: true, trim: true },
    sessionId: { type: String, require: true, trim: true },
    expiresAt: { type: Date, require: true },
    revoked: { type: Boolean, default: false }
}, { timestamps: true })


export const sessionModal = mongoose.model("Session", userSession);