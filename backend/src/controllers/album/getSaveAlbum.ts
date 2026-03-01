import { NextFunction, Request, Response } from "express";
import { saveAlbum } from "../../service/album/saveAlbum.js";
import { apiError } from "../../utils/apiError.js";

export const getSaveAlbum = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user.userId;

  if (!userId) {
    return next(new apiError(401, "Unauthorize can't get save album", {
      message: "Login to see save album"
    }))
  }

  try {
    const album = await saveAlbum(userId)
    res.status(200).json(album);
  } catch {
    next(new apiError(500, "Error getting saved album", {
      message: "Server Error"
    }))
  }
};
