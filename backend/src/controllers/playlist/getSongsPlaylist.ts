import axios from "axios";
import { Request, Response } from "express";
import { getLikedPlaylist } from "../../service/playlist/getLikedPlaylist.js";
import { retriveSongPlaylist } from "../../service/playlist/retriveSongPlaylist.js";
import { getLikedSong } from "../../service/songs/getLikedSong.js";
import { APiSongsPlaylist } from "../../types/playlistType.js";

export const getSongsPlaylist = async (req: Request, res: Response) => {
  const { token } = req.params;
  const userId = req.user.userId;

  if (!token || typeof token !== "string") {
    return res.status(401).json({
      message: "Invalid input"
    })
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
    res.status(500).json({
      message: "Error"
    });
  }
};
