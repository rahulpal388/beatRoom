import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({
  id: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  perma_url: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true, default: "" },
  role: { type: String, required: true, trim: true, default: "" },
  isLiked: { type: Boolean, required: true, default: false },
});

export const artistModel = mongoose.model("Artists", ArtistSchema);
