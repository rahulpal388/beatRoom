import { NextFunction, Request, Response } from "express";
import { artistInfo } from "../../service/artists/artistInfo.js";
import z from "zod";
import { apiError } from "@utils/apiError.js";
import { formatValidationError } from "@utils/formatZodValidationError.js";




export const getArtistInfo = async (req: Request, res: Response, next: NextFunction) => {
  const { success, data, error } = z
    .object({ artistToken: z.string() })
    .safeParse(req.query);
  const userId = req.user.userId
  if (!success) {
    return next(new apiError(401, "Invalid input aritst info", {
      message: formatValidationError(error)
    }))

  }



  const response = await artistInfo(data.artistToken, userId);
  if (!response) {
    return next(new apiError(500, "Error finding aritst info", {
      message: "Server Error"
    }))
  }

  res.status(200).json(response)

};
