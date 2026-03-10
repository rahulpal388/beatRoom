import { saveUserSong } from "../../service/songs/saveUserSong.js";
import { saveSongType } from "../../zodTypes/songType.js";
import { NextFunction, Request, Response } from "express";
import { ISong } from "../../types/songType.js";
import { apiError } from "../../utils/apiError.js";
import { formatValidationError } from "../../utils/formatZodValidationError.js";



export const saveSong = async (req: Request, res: Response, next: NextFunction) => {
  const { success, data, error } = saveSongType.safeParse(req.body);
  const userId = req.user.userId;
  console.log(userId, "come to save the song")
  if (!success) {
    return next(new apiError(401, "Invalid input ", {
      message: formatValidationError(error)
    }))

  }

  if (!userId) {
    return next(new apiError(401, "Unauthoize login to save song", {
      message: "Login to save song"
    }))
  }

  try {

    await saveUserSong(userId, data as ISong);
    res.status(200).json({
      message: "song saved"
    })
  } catch (error) {
    return next(new apiError(500, "Error saving sogn", {
      message: "server error"
    }))
  }





};
