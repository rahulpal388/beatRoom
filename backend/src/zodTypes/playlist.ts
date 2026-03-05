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
  list_count: z.string(),
  language: z.string()
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


export const playlistSongType = z.object({
  token: z.string("token is undefine"),
  type: z.enum(["playlist", "userPlaylist"], "playlist type is messing ")
})


export const addSongToPlaylistType = z.object({
  id: z.string("Playlist id undefine"),
  songs: saveSongType
})