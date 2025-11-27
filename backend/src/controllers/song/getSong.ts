import { Request, Response } from "express";
import { getSongDetails } from "../../utils/getSongDetails";

export const getSong = async (req: Request, res: Response) => {
  const token = req.params.token;
  const result = await getSongDetails(token);
  if (!result) {
    res.status(200).json([]);
    return;
  }

  res.status(200).json(...result);
};
