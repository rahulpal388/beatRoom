import { Request, Response } from "express";
import { saveAlbum } from "../../service/album/saveAlbum.js";

export const getSaveAlbum = async (req: Request, res: Response) => {
  const userId = req.user.userId;

  if (!userId) {
    return res.status(401).json({
      message: "Login to get album"
    })
  }

  try {
    const album = await saveAlbum(userId)
    console.log(album)
    // console.log(JSON.stringify(album?.likes?.albums));
    res.status(200).json(album);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error while getting the album ",
    });
  }
};
