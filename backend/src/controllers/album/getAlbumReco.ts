import { NextFunction, Request, Response } from "express";
import { albumReco } from "../../service/album/albumReco.js";
import { apiError } from "../../utils/apiError.js";



export const getAlbumReco = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const userId = req.user.userId;

  if (!id || typeof id !== "string") {
    return next(new apiError(401, "Invalid input", {
      message: "Invalid input, id is missing"
    }))
  }

  const response = await albumReco(id, userId);

  res.status(200).json(response)
};
