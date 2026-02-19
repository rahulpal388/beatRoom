import { removeLikedPlaylist } from "../../service/playlist/removeLikedPlaylist.js";
import { playlistModel } from "../../db/schema/playlist.js";
import { userModel } from "../../db/schema/user.js";
import { Request, Response } from "express";
import { removePlaylistType } from "@zodTypes/playlist.js";
import { formatValidationError } from "@utils/formatZodValidationError.js";

export const removePlaylist = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const { success, data, error } = removePlaylistType.safeParse(req.body)

  if (!success) {
    return res.status(401).json({
      message: formatValidationError(error)
    })
  }

  if (!userId) {
    return res.status(401).json({
      message: "log in to save playlist ",
    });
  }

  try {
    await removeLikedPlaylist(userId, data.id, data.type)
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
