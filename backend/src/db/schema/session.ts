import mongoose from "mongoose"


const userSession = new mongoose.Schema({
    refToken: { type: String, require: true, trim: true },
    sessionId: { type: String, require: true, trim: true },
    expiresAt: { type: Date, require: true },
}, { timestamps: true })


userSession.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export const sessionModal = mongoose.model("Session", userSession);