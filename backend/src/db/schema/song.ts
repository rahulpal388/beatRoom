import mongoose, { mongo } from "mongoose";

const SongsSchema = new mongoose.Schema({
  id: { type: String, required: true, trim: true },
  isPlaylist: { type: Boolean, require: true, default: false },
  title: { type: String, required: true, trim: true },
  subtitle: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  perma_url: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  language: { type: String, required: true, trim: true },
  play_count: { type: String, required: true, trim: true },
  isLiked: { type: Boolean, required: true },
  more_info: {
    album_id: { type: String, required: true, trim: true },
    album: { type: String, required: true, trim: true },
    album_url: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    encrypted_media_url: { type: String, required: true, trim: true },
    release_date: { type: String, required: true, trim: true },
    artistMap: {
      artists: [{ type: mongoose.Schema.ObjectId, ref: "Artists" }],
    },
  },
});

export const songModel = mongoose.model("Songs", SongsSchema);
