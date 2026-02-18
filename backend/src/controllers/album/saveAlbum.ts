import { Request, Response } from "express";
import { saveUserAlbum } from "../../service/album/saveUserAlbum.js";
import { saveAlbumType } from "../../zodTypes/album.js";
import { IAlbum } from "../../types/album.js";

export const saveAlbum = async (req: Request, res: Response) => {
  console.log("saving album");

  const { success, data } = saveAlbumType.safeParse(req.body);
  const userId = req.user.userId;

  if (!success) {
    return res.status(401).json({
      message: "invalid input",
    });
  }

  if (!userId) {
    return res.status(401).json({
      message: "log in to save album",
    });
  }
  try {
    await saveUserAlbum(userId, data as IAlbum)

    res.status(200).json({
      message: "album saved",
    });
  } catch (error) {

    console.error(error);
    res.status(500).json({
      message: "error savign album"
    })

  }

};
