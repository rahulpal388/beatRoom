import z from "zod";
import { NextFunction, Request, Response } from "express";
import { albumSong } from "../../service/album/albumSong.js";
import { apiError } from "../../utils/apiError.js";
import { formatValidationError } from "../../utils/formatZodValidationError.js";



export const getSongAlbum = async (req: Request, res: Response, next: NextFunction) => {
  const { success, data, error } = z
    .object({
      albumToken: z.string(),
    })
    .safeParse(req.query);
  const userId = req.user.userId;

  if (!success) {
    return next(new apiError(401, "Invalid input", {
      message: formatValidationError(error)
    }))

  }

  const response = await albumSong(data.albumToken, userId);

  if (!response) {
    return next(new apiError(500, "Error Getting album song", {
      message: "Error getting album song"
    }))
  }

  res.status(200).json(response);
};
