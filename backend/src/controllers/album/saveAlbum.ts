import { NextFunction, Request, Response } from "express";
import { saveUserAlbum } from "../../service/album/saveUserAlbum.js";
import { saveAlbumType } from "../../zodTypes/album.js";
import { IAlbum } from "../../types/album.js";
import { apiError } from "../../utils/apiError.js";
import { formatValidationError } from "../../utils/formatZodValidationError.js";

export const saveAlbum = async (req: Request, res: Response, next: NextFunction) => {

  const { success, data, error } = saveAlbumType.safeParse(req.body);
  const userId = req.user.userId;

  if (!success) {
    return next(new apiError(401, "Invalid input save album", {
      message: formatValidationError(error)
    }))
  }

  if (!userId) {
    return next(new apiError(401, "Unauthorize login to save album", {
      message: "Login to save album"
    }))
  }
  try {
    await saveUserAlbum(userId, data as IAlbum)


    res.status(200).json({
      message: "album saved",
    });
  } catch {
    next(new apiError(500, "Error saving album", {
      message: "Server Error"
    }))

  }

};
