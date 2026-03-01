import { NextFunction, Request, Response } from "express";
import { savePlaylistType } from "../../zodTypes/playlist.js";
import { saveLikedPlaylist } from "../../service/playlist/savelikedPlaylist.js";
import { IPlaylist } from "../../types/playlistType.js";
import { apiError } from "@utils/apiError.js";
import { formatValidationError } from "@utils/formatZodValidationError.js";

export const savePlaylist = async (req: Request, res: Response, next: NextFunction) => {
  const { success, data, error } = savePlaylistType.safeParse(req.body);
  const userId = req.user.userId;
  if (!success) {
    return next(new apiError(401, "Invalid input save album", {
      message: formatValidationError(error)
    }))

  }

  if (!userId) {
    return next(new apiError(401, "Unauthorize to get save playlsit", {
      message: "Login to see the save playlist"
    }))
  }

  try {
    await saveLikedPlaylist(userId, data as IPlaylist)

    res.status(200).json({
      message: "playlist saved",
    });
  } catch (error) {
    return next(new apiError(500, "Error getting save playlist", {
      message: "Server Error"
    }))
  }
};
