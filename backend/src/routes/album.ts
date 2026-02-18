import { getTrendingAlbum } from "../controllers/album/getTrendingAlbum.js";
import { getAlbumReco } from "../controllers/album/getAlbumReco.js";
import { getSongAlbum } from "../controllers/album/getAlbumSong.js";
import { Router } from "express";
import { saveAlbum } from "../controllers/album/saveAlbum.js";
import { removeAlbum } from "../controllers/album/removeAlbum.js";
import { getSaveAlbum } from "../controllers/album/getSaveAlbum.js";

const useAlbum = Router();

useAlbum.get("/getSave", getSaveAlbum);
useAlbum.post("/save", saveAlbum);
useAlbum.post("/remove", removeAlbum);

// get trending album
useAlbum.get("/trendingAlbum", getTrendingAlbum);

// get the album recommandation
useAlbum.get("/reco/:id", getAlbumReco);

// get info and songs of the album
useAlbum.get("/", getSongAlbum);

export default useAlbum;
