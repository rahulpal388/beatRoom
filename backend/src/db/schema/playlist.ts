import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    perma_url: { type: String, required: true, trim: true },
    isLiked: { type: Boolean, required: true },
    more_info: {
      song_count: { type: String, required: true, trim: true },
    },
  },
  { _id: false }
);

export const playlistModel = mongoose.model("Playlists", PlaylistSchema);
