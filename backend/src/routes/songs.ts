import axios from "axios";
import { Router } from "express";
import getTrendingSong from "../controllers/song/getTendingSong";
import getNewReleasedSong from "../controllers/song/newReleasedSong";
import { getSongReco } from "../controllers/song/getSongReco";
import { getSong } from "../controllers/song/getSong";
import { getSongUrl } from "../controllers/song/getSongUrl";

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

useSong.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(
      `http://127.0.0.1:5100/song/?query=${encodeURIComponent(query as string)}`
    );

    const suggestion = response.data as TSearchSuggestion[];

    const suggestionResult = suggestion.map((x) => {
      return {
        id: x.id,
        title: x.song,
        image: { quality: "320px", url: x.image },
        album: x.album_url,
        artist: x.singers,
        type: x.type,
        language: x.language,
      };
    });
    console.log(suggestionResult);
    res.status(200).json({
      results: suggestionResult,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
});

// to get the trending song based on the language => use limit query
useSong.get("/trendingSong", getTrendingSong);

// get the new release song => use limit query
useSong.get("/newReleased", getNewReleasedSong);

// get the song reco base on the song id
useSong.get("/reco/:id", getSongReco);

// get song by token
useSong.get("/:token", getSong);

export default useSong;
