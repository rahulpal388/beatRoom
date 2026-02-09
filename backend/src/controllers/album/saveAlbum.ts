import { saveAlbumType } from "../../zodTypes/album.js";
import { Request, Response } from "express";

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


  res.status(200).json({
    message: "fix this endpoint",
  });
};
