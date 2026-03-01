import { apiError } from "../../utils/apiError.js";
import { decryptUrl } from "../../utils/decryptUrl.js";
import { NextFunction, Request, Response } from "express";

export const getSongUrl = async (req: Request, res: Response, next: NextFunction) => {
  const { encrypted_media_url } = req.body;
  if (!encrypted_media_url || typeof encrypted_media_url !== "string") {
    return next(new apiError(401, "Invalid input ", {
      message: "Invalid input"
    }))
  }

  try {
    const url = decryptUrl(encrypted_media_url);
    res.status(200).json({ song_url: url });
  } catch {
    return next(new apiError(500, "Error gettign the song url", {
      message: "Server Error"
    }))
  }
};
