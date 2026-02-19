import { userModel } from "../../db/schema/user.js";
import { Request, Response } from "express";

export const getSavePlaylist = async (req: Request, res: Response) => {
  const userId = req.user.userId;

  if (!userId) {
    return res.status(401).json({
      message: "Login to get the save playlist"
    })
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

    console.log(userSavedPlaylist?.user_playlist)


    res.status(200).json([...savedPlaylist!.playlists, ...userSavedPlaylist!.user_playlist]);
  } catch (error) {
    console.log(error)
    res.status(500).json({
      messsage: "error getting the save playlist",
    });
  }
};
