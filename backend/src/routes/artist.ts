import { saveArtist } from "../controllers/artist/saveArtist.js";
import { getArtistInfo } from "../controllers/artist/getArtistInfo.js";
import getTopArtits from "../controllers/artist/getTopArtist.js";
import { Router } from "express";
import verifyTokenMiddleware from "../middleware/verifyToken.js";
import { getSaveArtist } from "../controllers/artist/getSaveArtist.js";

export const useArtist = Router();

useArtist.get("/topArtist", getTopArtits);

useArtist.get("/", getArtistInfo);

useArtist.post("/save", verifyTokenMiddleware, saveArtist);
useArtist.get("/getSave", verifyTokenMiddleware, getSaveArtist);
