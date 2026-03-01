import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { getLikedPlaylist } from "../../service/playlist/getLikedPlaylist.js";
import { retriveSongPlaylist } from "../../service/playlist/retriveSongPlaylist.js";
import { getLikedSong } from "../../service/songs/getLikedSong.js";
import { APiSongsPlaylist } from "../../types/playlistType.js";
import { apiError } from "@utils/apiError.js";

export const getSongsPlaylist = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.params;
  const userId = req.user.userId;

  if (!token || typeof token !== "string") {
    return next(new apiError(401, "Invalid input ", {
      message: "Invalid Input"
    }))
  }

  try {
    const [response, likedSong, likedPlaylist] = await Promise.all([
      axios.get(
        `https://www.jiosaavn.com/api.php?__call=webapi.get&api_version=4&_format=json&_marker=0&ctx=web6dot0&token=${token}&type=playlist`
      ),
      getLikedSong(userId),
      getLikedPlaylist(userId),
    ]);
    const playlist = response.data as APiSongsPlaylist;
    const result = retriveSongPlaylist(playlist, likedSong, likedPlaylist);

    res.status(200).json(result);
  } catch {
    next(new apiError(500, "Error getting playlist songs", {
      message: "Server Error"
    }))
  }
};
