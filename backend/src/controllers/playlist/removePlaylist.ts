import { playlistModel } from "../../db/schema/playlist.js";
import { userModel } from "../../db/schema/user.js";
import { Request, Response } from "express";

export const removePlaylist = async (req: Request, res: Response) => {
  const userId = req.user.userId;

  if (!userId) {
    return res.status(401).json({
      message: "log in to save playlist ",
    });
  }

  try {
    const playlist = await playlistModel.findOne({ id: req.body.id });

    await userModel.findOneAndUpdate(
      { userId },
      { $pull: { "likes.playlists": playlist?._id } }
    );

    res.status(200).json({
      message: "playlist removed",
    });
  } catch (error) {
    res.status(500).json({
      message: "error while removing the playlist",
    });
  }
};
