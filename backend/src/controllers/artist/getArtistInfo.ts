import { Request, Response } from "express";
import { artistInfo } from "../../service/artists/artistInfo.js";
import z from "zod";




export const getArtistInfo = async (req: Request, res: Response) => {
  const { success, data } = z
    .object({ artistToken: z.string() })
    .safeParse(req.query);
  const userId = req.user.userId
  if (!success) {
    return res.status(401).json({
      message: "Invalid input"
    });

  }



  const response = await artistInfo(data.artistToken, userId);
  console.log(data.artistToken)
  if (!response) {
    return res.status(500).json({
      message: "Error while finding information about artist"
    })
  }

  res.status(200).json(response)

};
