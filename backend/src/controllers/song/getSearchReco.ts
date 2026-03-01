import { NextFunction, Request, Response } from "express";
import { searchReco } from "../../service/songs/searchReco.js";
import { apiError } from "../../utils/apiError.js";



export const getSearchReco = async (req: Request, res: Response, next: NextFunction) => {
  const { query } = req.query;

  if (!query || typeof query !== "string") {
    return next(new apiError(401, "Invalid input ", {
      message: "Invalid input"
    }))
  }

  const reco = await searchReco(query);

  if (!reco) {
    return next(new apiError(500, "Error getting search reco", {
      message: "Server Error"
    }))
  }

  res.status(200).json(reco);

};






