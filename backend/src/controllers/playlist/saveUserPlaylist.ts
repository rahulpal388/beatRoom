import { saveUserPlaylistType } from "../../zodTypes/playlist.js";
import { NextFunction, Request, Response } from "express";
import { savePlaylist } from "../../service/playlist/saveUserPlaylist.js";
import { ISong } from "../../types/songType.js";
import { apiError } from "../../utils/apiError.js";
import { formatValidationError } from "../../utils/formatZodValidationError.js";

export const saveUserPlaylist = async (req: Request, res: Response, next: NextFunction) => {
  const { success, data, error } = saveUserPlaylistType.safeParse(req.body);
  const { userId } = req.user

  if (!success) {
    return next(new apiError(401, "Invalid input save album", {
      message: formatValidationError(error)
    }))

  }

  if (!userId) {
    return next(new apiError(401, "Unauthorize to save user playlist", {
      message: "Login to save playlist"
    }))
  }

  const isPlaylistSaved = await savePlaylist(userId, data.title, data.subtitle, data.songs as ISong[])

  if (!isPlaylistSaved) {
    return next(new apiError(500, "Error saving user playlist", {
      message: "Server Error"
    }))
  }
  res.status(200).json({
    message: "saved user playlist "
  })

}
