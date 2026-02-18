import { removeUserAlbum } from "../../service/album/removeUserAlbum.js";
import { Request, Response } from "express";

export const removeAlbum = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const { id } = req.body;

  if (!id || typeof id !== "string") {
    return res.status(400).json({
      message: "Invalid input"
    })
  }


  if (!userId) {
    return res.status(401).json({
      message: "log in to remove the album",
    });
  }

  try {
    await removeUserAlbum(userId, id);
    res.status(200).json({
      message: "remove album",
    });
  } catch (error) {
    res.status(500).json({
      message: "error while removing the album",
    });
  }
};
