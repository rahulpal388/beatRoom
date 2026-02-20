import { decryptUrl } from "../../utils/decryptUrl.js";
import { Request, Response } from "express";

export const getSongUrl = async (req: Request, res: Response) => {
  const { encrypted_media_url } = req.body;
  console.log(encrypted_media_url)
  if (!encrypted_media_url || typeof encrypted_media_url !== "string") {
    return res.status(401).json({
      message: "Invalid id"
    })
  }

  try {
    const url = decryptUrl(encrypted_media_url);
    res.status(200).json({ song_url: url });
  } catch {
    res.status(500).json({ message: "Can't play this song" });
  }
};
