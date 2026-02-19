import { saveUserPlaylistType } from "../../zodTypes/playlist.js";
import { Request, Response } from "express";
import { savePlaylist } from "../../service/playlist/saveUserPlaylist.js";
import { ISong } from "../../types/songType.js";

export const saveUserPlaylist = async (req: Request, res: Response) => {
  const { success, data } = saveUserPlaylistType.safeParse(req.body);
  const { userId } = req.user

  if (!success) {
    return res.status(400).json({
      message: "Invalid Input",
    });

  }

  if (!userId) {
    return res.status(401).json({
      message: "login to save the song"
    })
  }


  const isPlaylistSaved = await savePlaylist(userId, data.title, data.subtitle, data.songs as ISong[])

  if (!isPlaylistSaved) {
    return res.status(500).json({
      message: "Error while saving the user playlist"
    })
  }

  res.status(200).json({
    message: "saved user playlist "
  })

};
