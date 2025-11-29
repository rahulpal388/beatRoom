import { Router } from "express";
import getTrendingSong from "../controllers/song/getTendingSong.js";
import getNewReleasedSong from "../controllers/song/newReleasedSong.js";
import { getSongReco } from "../controllers/song/getSongReco.js";
import { getSong } from "../controllers/song/getSong.js";
import { getSongUrl } from "../controllers/song/getSongUrl.js";
import { getSearchReco } from "../controllers/song/getSearchReco.js";

type TPlaylistSongs = {
  id: string;
  title: string;
  type: string;
  image: string;
  more_info: {
    duration: string;
    artistMap: {
      primary_artists: { name: string }[];
    };
  };
};

type TSearchSuggestion = {
  id: string;
  song: string;
  image: string;
  album_url: string;
  type: string;
  singers: string;
  language: string;
};

export type TSong = {
  duration: string;
  type: string;
  media_url: string;
};

const useSong = Router();

useSong.post("/play", getSongUrl);

useSong.get("/search", getSearchReco);

// to get the trending song based on the language => use limit query
useSong.get("/trendingSong", getTrendingSong);

// get the new release song => use limit query
useSong.get("/newReleased", getNewReleasedSong);

// get the song reco base on the song id
useSong.get("/reco/:id", getSongReco);

// get song by token
useSong.get("/:token", getSong);

export default useSong;
