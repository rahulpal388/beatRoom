import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema({
  id: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  subtitle: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  perma_url: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  language: { type: String, required: true, trim: true },
  list_count: { type: String, required: true, trim: true },
  isLiked: { type: Boolean, required: true, default: false },
  more_info: {
    artistMap: {
      artists: [{ type: mongoose.Schema.ObjectId, ref: "Artists" }],
    },
  },
});

export const albumModel = mongoose.model("Albums", AlbumSchema);
