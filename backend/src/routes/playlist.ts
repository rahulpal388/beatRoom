import getTopPlaylist from "../controllers/playlist/getTopPlaylist";
import { Router } from "express";

export const usePlaylist = Router();

usePlaylist.get("/", getTopPlaylist);
