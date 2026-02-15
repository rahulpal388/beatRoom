import mongoose from "mongoose";


const roomSchema = new mongoose.Schema({
    name: { type: String, require: true, trim: true },
    host: { type: mongoose.Schema.ObjectId, ref: "Users" },
    members: [{ type: mongoose.Schema.ObjectId, ref: "Users" }]
}, { timestamps: true })



export const roomModel = mongoose.model("Rooms", roomSchema);