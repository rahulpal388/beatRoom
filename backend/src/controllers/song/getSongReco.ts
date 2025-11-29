import axios from "axios";
import { Request, Response } from "express";
import { ISong } from "./getTendingSong.js";
import { retriveSong } from "../../utils/retriveSong.js";

export const getSongReco = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const response = await axios.get(
      `https://www.jiosaavn.com/api.php?__call=reco.getreco&api_version=4&_format=json&_marker=0&ctx=web6dot0&pid=${id}&language=hindi`
    );

    const result = retriveSong(response.data as ISong[]);
    res.status(200).json(result);
  } catch (error) {
    res.status(200).json([]);
  }
};
