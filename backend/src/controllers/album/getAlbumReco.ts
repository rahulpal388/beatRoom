import { Request, Response } from "express";
import { albumReco } from "../../service/album/albumReco.js";



export const getAlbumReco = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userId = req.user.userId;

  if (!id || typeof id !== "string") {
    return res.status(401).json({
      message: "Invalid input, id is missing"
    })
  }

  const response = await albumReco(id, userId);

  return res.status(200).json(response)
};
