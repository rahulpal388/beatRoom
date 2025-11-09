import getTopArtits from "../controllers/artist/getTopArtist";
import { Router } from "express";

export const useArtist = Router();

useArtist.get("/", getTopArtits);
