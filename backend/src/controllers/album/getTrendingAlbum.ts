import { pagination } from "../../utils/pagination.js";
import { paginationType } from "../../zodTypes/paginatipType.js";
import { Request, Response } from "express";
import { trendingAlbum } from "../../service/album/trendingAlbum.js";
import z from "zod";

export const getTrendingAlbum = async (req: Request, res: Response) => {
  const { success, data } = paginationType
    .and(z.object({ language: z.string() }))
    .safeParse(req.query);
  const userId = req.user.userId;
  if (!success) {
    res.status(200).json([]);
    return;
  }
  const response = await trendingAlbum(data.language, userId)

  const album = pagination(response, data.limit, data.page);

  res.status(200).json(album)

};
