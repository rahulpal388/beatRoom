import { userModel } from "../../db/schema/user.js";
import { Request, Response } from "express";

export const getSavePlaylist = async (req: Request, res: Response) => {
  const userId = req.user.userId;

  try {
    const playlist = await userModel.findOne({ userId }).populate({
      path: "likes.playlists",
      model: "Playlists",
      select: "-_id -__v",
    });

    console.log(JSON.stringify(playlist));
    res.status(200).json(playlist?.playlists);
  } catch (error) {
    res.status(500).json({
      messsage: "error getting the save playlist",
    });
  }
};
