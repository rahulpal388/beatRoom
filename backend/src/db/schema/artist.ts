import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({
  id: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  perma_url: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  isLiked: { type: Boolean, required: true },
});

export const artistModel = mongoose.model("Artists", ArtistSchema);
