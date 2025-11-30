import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  profile: { type: String, trim: true, default: null },
  refreshToken: { type: String, trim: true, default: null },
  accessToken: { type: String, trim: true, default: null },
  history: [{ type: mongoose.Schema.ObjectId, ref: "Songs" }],
  likes: {
    songs: [{ type: mongoose.Schema.ObjectId, ref: "Songs" }],
    albums: [{ type: mongoose.Schema.ObjectId, ref: "Albums" }],
    playlists: [{ type: mongoose.Schema.ObjectId, ref: "Playlists" }],
    userPlaylist: [{ type: mongoose.Schema.ObjectId, ref: "UserPlaylists" }],
  },
});

export const userModel = mongoose.model("Users", UserSchema);
