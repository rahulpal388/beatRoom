import { retrivePlaylist } from "../../utils/retrivePlaylist.js";
import { paginationType } from "../../zodTypes/paginatipType.js";
import axios from "axios";
import { NextFunction, Request, Response } from "express";
import z from "zod";
import { ApiPlaylist } from "../../types/playlistType.js";
import { getLikedPlaylist } from "../../service/playlist/getLikedPlaylist.js";
import { PaginationSlice } from "../../utils/paginationSlice.js";
import { apiError } from "@utils/apiError.js";
import { formatValidationError } from "@utils/formatZodValidationError.js";



export const getTrendingPlaylist = async (req: Request, res: Response, next: NextFunction) => {
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
    const [response, likedPlaylist] = await Promise.all([
      await axios.get(
        `https://www.jiosaavn.com/api.php?__call=content.getTrending&api_version=4&_format=json&_marker=0&ctx=web6dot0&entity_type=playlist&entity_language=${data.language}`
      ),
      getLikedPlaylist(userId),
    ]);

    const playlist = PaginationSlice(response.data, Number(data.limit), Number(data.page)) as ApiPlaylist[];

    const result = retrivePlaylist(playlist, likedPlaylist);

    res.status(200).json(result);
  } catch {
    return next(new apiError(500, "Error getting trending playlist", {
      message: "Server Error"
    }))
  }
};





