import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { getLikedSong } from "../../service/songs/getLikedSong.js";
import { retriveSong } from "../../service/songs/retriveSong.js";
import { ApiSong } from "../../types/songType.js";
import z from "zod";
import { formatValidationError } from "../../utils/formatZodValidationError.js";
import { apiError } from "@utils/apiError.js";

export const getSongReco = async (req: Request, res: Response, next: NextFunction) => {
  const { success, error, data } = z.object({ id: z.string(), language: z.string() }).safeParse(req.body)
  const userId = req.user.userId;

  if (!success) {
    return next(new apiError(401, "Invalid input save album", {
      message: formatValidationError(error)
    }))
  }

  try {
    const [response, likedSong] = await Promise.all([
      axios.get(
        `https://www.jiosaavn.com/api.php?__call=reco.getreco&api_version=4&_format=json&_marker=0&ctx=web6dot0&pid=${data.id}&language=${data.language}`
      ),
      getLikedSong(userId),
    ]);
    const result = retriveSong(response.data as ApiSong[], likedSong);
    res.status(200).json(result);
  } catch {
    return next(new apiError(500, "Error getting song Reco", {
      message: "Server Error"
    }))
  }
};
