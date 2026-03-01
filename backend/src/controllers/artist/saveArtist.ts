import { apiError } from "../../utils/apiError.js";
import { saveLikedArtist } from "../../service/artists/saveLikedArtist.js";
import { saveArtistType } from "../../zodTypes/artistType.js";
import { NextFunction, Request, Response } from "express";
import { formatValidationError } from "../../utils/formatZodValidationError.js";

export const saveArtist = async (req: Request, res: Response, next: NextFunction) => {
  const { success, data, error } = saveArtistType.safeParse(req.body);
  const userId = req.user.userId;
  if (!success) {
    return next(new apiError(401, "Invalid input save album", {
      message: formatValidationError(error)
    }))
  }

  if (!userId) {
    return next(new apiError(401, "Unauthorize login to  save artist", {
      message: "Login to  save artist"
    }))
  }
  try {
    await saveLikedArtist(userId, {
      id: data.id,
      name: data.name,
      role: data.role,
      image: data.image,
      type: "artist",
      perma_url: data.perma_url,
      isLiked: true
    })



    res.status(200).json({
      message: "artist save",
    });
  } catch {
    return next(new apiError(500, "Error saving arists", {
      message: "Server Error"
    }))
  }
};
