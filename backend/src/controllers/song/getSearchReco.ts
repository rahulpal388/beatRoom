import { Request, Response } from "express";
import { searchReco } from "service/songs/searchReco.js";



export const getSearchReco = async (req: Request, res: Response) => {
  const { query } = req.query;

  if (!query || typeof query !== "string") {
    return res.status(401).json({
      message: "Invalid input"
    })
  }

  const reco = await searchReco(query);

  if (!reco) {
    return res.status(500).json({
      message: "can't find any recommandations"
    })
  }

  res.status(200).json(reco);

};






