import { getTrendingAlbum } from "../controllers/album/getTrendingAlbum.js";
import { getAlbumReco } from "../controllers/album/getAlbumReco.js";
import { getSongAlbum } from "../controllers/album/getAlbumSong.js";
import { Router } from "express";

const useAlbum = Router();

// get trending album
useAlbum.get("/trendingAlbum", getTrendingAlbum);

// get the album recommandation
useAlbum.get("/reco/:id", getAlbumReco);

// get info and songs of the album
useAlbum.get("/", getSongAlbum);

export default useAlbum;
