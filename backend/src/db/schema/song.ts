import mongoose from "mongoose";

const SongsSchema = new mongoose.Schema({
  id: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  subtitle: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  perma_url: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  language: { type: String, required: true, trim: true },
  play_count: { type: String, required: true, trim: true },
  isLiked: { type: Boolean, required: true, default: false },
  isPlaylist: { type: Boolean, require: true, default: false },
  more_info: {
    album_id: { type: String, required: true, trim: true },
    album: { type: String, required: true, trim: true },
    album_url: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    encrypted_media_url: { type: String, required: true, trim: true },
    release_date: { type: String, required: true, trim: true },
    artistMap: {
      artists: [{
        id: { type: String, require: true, trim: true },
        name: { type: String, require: true, trim: true },
        image: { type: String, require: true, trim: true },
        perma_url: { type: String, require: true, trim: true },
        type: { type: String, require: true, trim: true },
        role: { type: String, require: true, trim: true }
      }],
    },
  },
});





export const songModel = mongoose.model("Songs", SongsSchema);
