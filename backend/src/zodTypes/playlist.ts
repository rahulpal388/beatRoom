import z from "zod";
import { saveSongType } from "./songType.js";

export const playlistType = z.object({
  page: z.number(),
  limit: z.number(),
  id: z.string(),
});

export const savePlaylistType = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  type: z.string(),
  image: z.string(),
  isLiked: z.boolean(),
  perma_url: z.string(),
});

export const saveUserPlaylistType = z.object({
  title: z.string(),
  subtitle: z.string(),
  songs: z.array(saveSongType),
});


export const removePlaylistType = z.object({
  id: z.string(),
  type: z.string()
})