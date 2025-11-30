import mongoose from "mongoose";

const UserPlaylistSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  song_count: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  isLike: { type: Boolean, required: true },
  Songs: [{ type: mongoose.Schema.ObjectId, ref: "Songs" }],
});

export const userPlaylistModel = mongoose.model(
  "UserPlaylists",
  UserPlaylistSchema
);
