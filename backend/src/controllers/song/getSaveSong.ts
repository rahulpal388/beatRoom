import { userModel } from "../../db/schema/user.js";
import { Request, Response } from "express";

export const getSaveSong = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  if (!userId) {
    return res.status(401).json({
      message: "Log in to get save song"
    })
  }
  try {
    const user = await userModel.findOne({ userId }).populate({
      path: "songs",
      select: "-_id -__v -isPlaylist",
    });

    res.status(200).json(user!.songs);
  } catch (error) {
    console.error(error);
    res.status(500).json("error while finding the save song");
  }
};
