import { Request, Response } from "express";
import { getSongDetails } from "../../service/songs/getSongDetails.js";


export const getSong = async (req: Request, res: Response) => {
  const { token } = req.params;
  const userId = req.user.userId;
  const result = await getSongDetails(token, userId);
  console.log(result);
  if (!result) {
    res.status(200).json([]);
    return;
  }

  res.status(200).json(...result);
};
