import mongoose from "mongoose";

const UserPlaylistSchema = new mongoose.Schema({
  id: { type: String, required: true, trim: true, default: "" },
  title: { type: String, required: true, trim: true },
  subtitle: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true, default: "playlist" },
  image: { type: String, required: true, trim: true },
  perma_url: { type: String, required: true, trim: true, default: "" },
  isLiked: { type: Boolean, required: true },
  songs: [{ type: mongoose.Schema.ObjectId, ref: "Songs" }]
});

export const userPlaylistModel = mongoose.model(
  "UserPlaylists",
  UserPlaylistSchema
);
