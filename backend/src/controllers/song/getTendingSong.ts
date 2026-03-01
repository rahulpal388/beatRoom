import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { paginationType } from "../../zodTypes/paginatipType.js";
import z from "zod";
import { ApiSong } from "../../types/songType.js";
import { getLikedSong } from "../../service/songs/getLikedSong.js";
import { retriveSong } from "../../service/songs/retriveSong.js";
import { apiError } from "../../utils/apiError.js";
import { formatValidationError } from "../../utils/formatZodValidationError.js";



const getTrendingSong = async (req: Request, res: Response, next: NextFunction) => {
  const { success, data, error } = paginationType
    .and(z.object({ language: z.string() }))
    .safeParse(req.query);
  const userId = req.user.userId;

  if (!success) {
    return next(new apiError(401, "Invalid input save album", {
      message: formatValidationError(error)
    }))
  }

  try {
    const [response, likedSong] = await Promise.all([
      axios.get(
        `https://www.jiosaavn.com/api.php?__call=content.getTrending&api_version=4&_format=json&_marker=0&ctx=web6dot0&entity_type=song&entity_language=${data.language}`
      ),
      getLikedSong(userId),
    ]);
    const trending = response.data as ApiSong[];
    const sliceTrending = trending.slice(
      Number(data.page) * Number(data.limit),
      (Number(data.page) + 1) * Number(data.limit)
    );
    const result = retriveSong(sliceTrending, likedSong);

    res.status(200).json(result);
  } catch {
    return next(new apiError(500, "Error getting trendign song", {
      message: "Server Error"
    }))
  }
};

export default getTrendingSong;
