import axios from "axios";
import { Request, Response } from "express";
import { ISong } from "./getTendingSong.js";
import { retriveSong } from "../../utils/retriveSong.js";
import { getLikedSong } from "../../utils/getlikedSong.js";

export const getSongReco = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user.userId;
  try {
    const [response, likedSong] = await Promise.all([
      axios.get(
        `https://www.jiosaavn.com/api.php?__call=reco.getreco&api_version=4&_format=json&_marker=0&ctx=web6dot0&pid=${id}&language=hindi`
      ),
      getLikedSong(userId),
    ]);

    const result = retriveSong(response.data as ISong[], likedSong);
    res.status(200).json(result);
  } catch (error) {
    res.status(200).json([]);
  }
};
