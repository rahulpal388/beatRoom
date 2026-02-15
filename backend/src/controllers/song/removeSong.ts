import { Request, Response } from "express";
import { removeUserSong } from "../../service/songs/removeUserSong.js";

export const removeSong = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const { id } = req.body;
  if (!userId) {
    return res.status(401).json({
      message: "log in to remove song",
    });
  }

  if (!id || typeof id !== "string") {
    return res.status(401).json({
      message: "Invalid input"
    })
  }

  try {

    await removeUserSong(userId, id)
    res.status(200).json({
      message: "Song removed"
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Error removing song"
    })

  }

};
