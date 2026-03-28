import mongoose, { InferSchemaType } from "mongoose";



const roomSchema = new mongoose.Schema({
    roomName: { type: String, required: true, trim: true },
    roomId: { type: String, required: true, trim: true, unique: true },
    admin: { type: mongoose.Schema.ObjectId, ref: "Users", required: true },
    members: [{ type: mongoose.Schema.ObjectId, ref: "Users" }],
    queueSongs: [{ type: mongoose.Schema.ObjectId, ref: "Songs" }],
}, { timestamps: true })

export type RoomSchemaType = InferSchemaType<typeof roomSchema>

export const roomModel = mongoose.model("Rooms", roomSchema);