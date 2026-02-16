import { Request, Response } from "express";
import { savePlaylistType } from "../../zodTypes/playlist.js";
import { saveLikedPlaylist } from "../../service/playlist/savelikedPlaylist.js";
import { IPlaylist } from "../../types/playlistType.js";

export const savePlaylist = async (req: Request, res: Response) => {
  const { success, data } = savePlaylistType.safeParse(req.body);
  const userId = req.user.userId;
  if (!success) {
    return res.status(400).json({
      message: "Invalid input",
    });


  }

  if (!userId) {
    return res.status(401).json({
      message: "log in to save playlist",
    });
  }

  try {
    await saveLikedPlaylist(userId, data as IPlaylist)

    res.status(200).json({
      message: "playlist saved",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while saving the playlist",
    });
  }
};
