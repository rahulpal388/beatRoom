import { apiError } from "../../utils/apiError.js";
import { userModel } from "../../db/schema/user.js";
import { NextFunction, Request, Response } from "express";

export const getSaveSong = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user.userId;
  console.log("request come to get the save song")
  console.log(userId)
  if (!userId) {
    return next(new apiError(401, "Unauthorize to get save song", {
      message: "Login to see the save song"
    }))
  }
  try {
    const user = await userModel.findOne({ userId }).populate({
      path: "songs",
      select: "-_id -__v -isPlaylist",
    });

    res.status(200).json(user!.songs);
  } catch {
    return next(new apiError(500, "Error getting save song", {
      message: "Server Error"
    }))
  }
};
