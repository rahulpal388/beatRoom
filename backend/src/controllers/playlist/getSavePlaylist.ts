import { apiError } from "../../utils/apiError.js";
import { userModel } from "../../db/schema/user.js";
import { NextFunction, Request, Response } from "express";
export const getSavePlaylist = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user.userId;

  if (!userId) {
    return next(new apiError(401, "Unauthorize login to save playlist", {
      message: "Login to save playlist"
    }))
  }

  try {

    const [savedPlaylist, userSavedPlaylist] = await Promise.all([
      userModel.findOne({ userId }).populate({
        path: "playlists",
        select: "-_id -__v -createdAt -updatedAt",
      }),
      userModel.findOne({ userId }).populate({
        path: "user_playlist",
        select: "-_id -__v -songs",
      })
    ])



    res.status(200).json([...savedPlaylist!.playlists, ...userSavedPlaylist!.user_playlist]);
  } catch {
    return next(new apiError(500, "Error saving playlist", {
      message: "Server Error"
    }))
  }
};
