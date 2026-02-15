import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  profile_image: { type: String, trim: true, default: null },
  session: [{ type: mongoose.Schema.ObjectId, ref: "Session" }],
  otp: [{ type: mongoose.Schema.ObjectId, ref: "Otp" }],
  history: [{ type: mongoose.Schema.ObjectId, ref: "Songs" }],
  songs: [{ type: mongoose.Schema.ObjectId, ref: "Songs" }],
  artists: [{ type: mongoose.Schema.ObjectId, ref: "Artists" }],
  albums: [{ type: mongoose.Schema.ObjectId, ref: "Albums" }],
  playlists: [{ type: mongoose.Schema.ObjectId, ref: "Playlists" }],
  user_playlist: [{ type: mongoose.Schema.ObjectId, ref: "UserPlaylists" }]
}, { timestamps: true });

export const userModel = mongoose.model("Users", UserSchema);
