import { getTrendingAlbum } from "../controllers/album/getTrendingAlbum";
import { getAlbumReco } from "../controllers/album/getAlbumReco";
import { getSongAlbum } from "../controllers/album/getAlbumSong";
import { Router } from "express";

const useAlbum = Router();

// get trending album
useAlbum.get("/trendingAlbum", getTrendingAlbum);

// get the album recommandation
useAlbum.get("/reco/:id", getAlbumReco);

// get info and songs of the album
useAlbum.get("/", getSongAlbum);

export default useAlbum;
