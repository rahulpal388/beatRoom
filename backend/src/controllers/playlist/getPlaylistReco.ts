import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { paginationType } from "../../zodTypes/paginatipType.js";
import z from "zod";
import { retrivePlaylist } from "../../utils/retrivePlaylist.js";
import { getLikedPlaylist } from "../../service/playlist/getLikedPlaylist.js";
import { ApiPlaylist } from "../../types/playlistType.js";
import { pagination } from "../../utils/pagination.js";
import { apiError } from "../../utils/apiError.js";
import { formatValidationError } from "../../utils/formatZodValidationError.js";

export const getPlaylistReco = async (req: Request, res: Response, next: NextFunction) => {
  const { success, data, error } = paginationType
    .and(z.object({ listid: z.string() }))
    .safeParse(req.query);
  const userId = req.user.userId;
  if (!success) {
    return next(new apiError(401, "Invalid input save album", {
      message: formatValidationError(error)
    }))
  }
  try {
    const [response, likedPlaylist] = await Promise.all([
      axios.get(
        `https://www.jiosaavn.com/api.php?__call=reco.getPlaylistReco&api_version=4&_format=json&_marker=0&ctx=web6dot0&listid=${data.listid}`
      ),
      getLikedPlaylist(userId),
    ]);

    const playlist = response.data as ApiPlaylist[];
    const result = retrivePlaylist(playlist, likedPlaylist);

    res.status(200).json(pagination(result, data.limit, data.page));
  } catch {
    next(new apiError(401, "Error getting playlist reco", {
      message: "Server Error"
    }))
  }
};
