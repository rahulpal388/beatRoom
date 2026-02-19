import mongoose from "mongoose";

const UserPlaylistSchema = new mongoose.Schema({
  id: { type: String, trim: true, default: "" },
  title: { type: String, required: true, trim: true },
  subtitle: { type: String, required: true, trim: true },
  type: { type: String, trim: true, default: "userPlaylist" },
  image: { type: String, trim: true, default: "" },
  perma_url: { type: String, trim: true, default: "" },
  isLiked: { type: Boolean, required: true },
  songs: [{ type: mongoose.Schema.ObjectId, ref: "Songs" }]
});

export const userPlaylistModel = mongoose.model(
  "UserPlaylists",
  UserPlaylistSchema
);
