import z from "zod";
import { saveSongType } from "./songType.js";

export const playlistType = z.object({
  page: z.number(),
  limit: z.number(),
  id: z.string(),
});

export const savePlaylistType = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  subtitle: z.string(),
  type: z.string(),
  image: z.string(),
  perma_url: z.string(),
  more_info: z.object({
    song_count: z.string(),
  }),
});

export const saveUserPlaylistType = z.object({
  title: z.string(),
  songs: z.array(saveSongType),
});
