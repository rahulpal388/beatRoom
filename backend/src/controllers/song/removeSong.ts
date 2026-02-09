import { Request, Response } from "express";
import { removeLikedSong } from "../../service/songs/removeLikedSong.js";

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

  const removed = await removeLikedSong(userId, id)

  if (removed) {
    res.status(200).json({
      message: "Song removed"
    })
  } else {
    res.status(500).json({
      message: "Error removing song"
    })
  }

};
