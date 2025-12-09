import { getTrendingPlaylist } from "../controllers/playlist/getTrendingPlaylist.js";
import getTopPlaylist from "../controllers/playlist/getTopPlaylist.js";
import { Router } from "express";
import { getSongsPlaylist } from "../controllers/playlist/getSongsPlaylist.js";
import { getPlaylistReco } from "../controllers/playlist/getPlaylistReco.js";
import { savePlaylist } from "../controllers/playlist/savePlaylist.js";
import verifyTokenMiddleware from "../middleware/verifyToken.js";
import { removePlaylist } from "../controllers/playlist/removePlaylist.js";
import { getSavePlaylist } from "../controllers/playlist/getSavePlaylist.js";

export const usePlaylist = Router();

usePlaylist.get("/", getTopPlaylist);

usePlaylist.post("/save", savePlaylist);
usePlaylist.get("/save", getSavePlaylist);
usePlaylist.post("/remove", removePlaylist);

// get trending playlist by language
usePlaylist.get("/trendingPlaylist", getTrendingPlaylist);

// get the playlist recommandation
usePlaylist.get("/reco", getPlaylistReco);

// get the songs of the playlist
usePlaylist.get("/:token", getSongsPlaylist);
