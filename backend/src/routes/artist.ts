import { getArtistInfo } from "../controllers/artist/getArtistInfo";
import getTopArtits from "../controllers/artist/getTopArtist";
import { Router } from "express";

export const useArtist = Router();

useArtist.get("/topArtist", getTopArtits);

useArtist.get("/", getArtistInfo);
