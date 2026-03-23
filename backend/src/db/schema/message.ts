

import mongoose, { InferSchemaType } from "mongoose";




const MessageSchema = new mongoose.Schema({
    senderId: { type: String, required: true, trim: true },
    sender: { type: String, required: true, trim: true },
    roomId: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    createdAt: { type: Date, required: true }
})

export type MessageSchemaType = InferSchemaType<typeof MessageSchema>

export const messageModal = mongoose.model("Messages", MessageSchema)