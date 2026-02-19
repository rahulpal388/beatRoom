import axios from "axios";
import { Request, Response } from "express";
import { getLikedSong } from "../../service/songs/getLikedSong.js";
import { retriveSong } from "../../service/songs/retriveSong.js";
import { ApiSong } from "../../types/songType.js";

export const getSongReco = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user.userId;

  if (!id || typeof id !== "string") {
    return res.status(401).json({
      message: "Invalid input"
    })
  }

  try {
    const [response, likedSong] = await Promise.all([
      axios.get(
        `https://www.jiosaavn.com/api.php?__call=reco.getreco&api_version=4&_format=json&_marker=0&ctx=web6dot0&pid=${id}&language=hindi`
      ),
      getLikedSong(userId),
    ]);

    const result = retriveSong(response.data as ApiSong[], likedSong);
    res.status(200).json(result);
  } catch {
    res.status(500).json({
      message: "Can't find any song recommandation"
    });
  }
};
