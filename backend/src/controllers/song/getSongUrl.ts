import { decryptUrl } from "../../utils/decryptUrl.js";
import { Request, Response } from "express";

export const getSongUrl = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id || typeof id !== "string") {
    return res.status(401).json({
      message: "Invalid id"
    })
  }

  try {
    const url = decryptUrl(id);
    res.status(200).json({ song_url: url });
  } catch (error) {
    res.status(500).json({ message: "Can't play this song" });
  }
};
