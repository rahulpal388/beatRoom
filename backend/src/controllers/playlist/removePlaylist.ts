import { removeLikedPlaylist } from "service/playlist/removeLikedPlaylist.js";
import { playlistModel } from "../../db/schema/playlist.js";
import { userModel } from "../../db/schema/user.js";
import { Request, Response } from "express";

export const removePlaylist = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const { id } = req.body;

  if (!id || typeof id !== "string") {
    return res.status(401).json({
      message: "Invalid input"
    })
  }

  if (!userId) {
    return res.status(401).json({
      message: "log in to save playlist ",
    });
  }

  try {
    await removeLikedPlaylist(userId, id)
    res.status(200).json({
      message: "playlist removed",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "error while removing the playlist",
    });
  }
};
