import z from "zod";
import { Request, Response } from "express";
import { albumSong } from "../../service/album/albumSong.js";



export const getSongAlbum = async (req: Request, res: Response) => {
  const { success, data } = z
    .object({
      songToken: z.string().optional(),
      albumToken: z.string(),
    })
    .safeParse(req.query);
  const userId = req.user.userId;

  if (!success) {
    return res.status(401).json({
      message: "Invalid input"
    });

  }

  const response = await albumSong(data.albumToken, userId);

  if (!response) {
    return res.status(500).json({
      message: "Erro while getting the album song"
    })
  }

  res.status(200).json(response);
};
