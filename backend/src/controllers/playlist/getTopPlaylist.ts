import { paginationType } from "../../zodTypes/paginatipType.js";
import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { retrivePlaylist } from "../../utils/retrivePlaylist.js";
import { getLikedPlaylist } from "../../service/playlist/getLikedPlaylist.js";
import { ApiPlaylist } from "../../types/playlistType.js";
import { apiError } from "@utils/apiError.js";
import { formatValidationError } from "@utils/formatZodValidationError.js";



const getTopPlaylist = async (req: Request, res: Response, next: NextFunction) => {
  const { success, data, error } = paginationType.safeParse(req.query);
  const userId = req.user.userId;
  if (!success) {
    return next(new apiError(401, "Invalid input save album", {
      message: formatValidationError(error)
    }))

  }

  try {
    const [response, likedPlaylist] = await Promise.all([
      axios.get(
        `https://www.jiosaavn.com/api.php?__call=content.getFeaturedPlaylists&fetch_from_serialized_files=true&p=${data.page}&n=${data.limit}&api_version=4&_format=json&_marker=0&ctx=web6dot0`
      ),
      getLikedPlaylist(userId),
    ]);

    const playlist = response.data.data as ApiPlaylist[];
    const result = retrivePlaylist(playlist, likedPlaylist);

    res.status(200).json(result);
  } catch {
    return next(new apiError(500, "Error getting top playlist", {
      message: "Server error"
    }))
  }
};

export default getTopPlaylist;
