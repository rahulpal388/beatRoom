import { NextFunction, Request, Response } from "express";
import { getSongDetails } from "../../service/songs/getSongDetails.js";
import { apiError } from "@utils/apiError.js";


export const getSong = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.params;
  const userId = req.user.userId;
  const result = await getSongDetails(token, userId);
  if (result.length === 0) {
    return next(new apiError(500, "Errro getting song details", {
      message: "Server Error"
    }))
  }

  res.status(200).json(...result);
};
