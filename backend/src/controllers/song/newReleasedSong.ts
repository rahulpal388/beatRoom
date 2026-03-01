import { NextFunction, Request, Response } from "express";
import { paginationType } from "../../zodTypes/paginatipType.js";
import { newReleasedSong } from "../../service/songs/newReleasedSong.js";
import { apiError } from "../../utils/apiError.js";
import { formatValidationError } from "../../utils/formatZodValidationError.js";



const getNewReleasedSong = async (req: Request, res: Response, next: NextFunction) => {
  const { success, data, error } = paginationType.safeParse(req.query);
  const userId = req.user.userId;
  if (!success) {
    return next(new apiError(401, "Invalid input save album", {
      message: formatValidationError(error)
    }))
  }

  const newSong = await newReleasedSong(userId, data.limit, data.page);

  res.status(200).json(newSong);

};

export default getNewReleasedSong;
