import { Router } from "express";
import getTrendingSong from "../controllers/song/getTendingSong.js";
import getNewReleasedSong from "../controllers/song/newReleasedSong.js";
import { getSongReco } from "../controllers/song/getSongReco.js";
import { getSong } from "../controllers/song/getSong.js";
import { getSongUrl } from "../controllers/song/getSongUrl.js";
import { getSearchReco } from "../controllers/song/getSearchReco.js";
import { saveSong } from "../controllers/song/saveSong.js";
import { getSaveSong } from "../controllers/song/getSaveSong.js";
import { removeSong } from "../controllers/song/removeSong.js";
import findUserSavedSong from "../service/songs/findUserSavedSong.js";

// export type TSong = {
//   duration: string;
//   type: string;
//   media_url: string;
// };

const useSong = Router();

useSong.get("/testing", async (req, res) => {
    const a = await findUserSavedSong("uqP8_-YO");
    res.json(a);
})

useSong.post("/play", getSongUrl);

useSong.get("/search", getSearchReco);

// to get the trending song based on the language => use limit query
useSong.get("/trendingSong", getTrendingSong);

// get the new release song => use limit query
useSong.get("/newReleased", getNewReleasedSong);

// get the song reco base on the song id
useSong.get("/reco/:id", getSongReco);

useSong.get("/save", getSaveSong);
useSong.post("/save", saveSong);
useSong.post("/remove", removeSong);

// get song by token
useSong.get("/:token", getSong);

export default useSong;
