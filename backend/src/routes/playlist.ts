import { getTrendingPlaylist } from "../controllers/playlist/getTrendingPlaylist";
import getTopPlaylist from "../controllers/playlist/getTopPlaylist";
import { Router } from "express";
import { getSongsPlaylist } from "../controllers/playlist/getSongsPlaylist";
import { getPlaylistReco } from "../controllers/playlist/getPlaylistReco";

export const usePlaylist = Router();

usePlaylist.get("/", getTopPlaylist);

// get trending playlist by language

usePlaylist.get("/trendingPlaylist", getTrendingPlaylist);

// get the playlist recommandation
usePlaylist.get("/reco", getPlaylistReco);

// get the songs of the playlist
usePlaylist.get("/:token", getSongsPlaylist);
