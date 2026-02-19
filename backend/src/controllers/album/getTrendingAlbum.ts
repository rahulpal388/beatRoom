import { pagination } from "../../utils/pagination.js";
import { paginationType } from "../../zodTypes/paginatipType.js";
import { Request, Response } from "express";
import { trendingAlbum } from "../../service/album/trendingAlbum.js";
import z from "zod";
import { formatValidationError } from "../../utils/formatZodValidationError.js";

export const getTrendingAlbum = async (req: Request, res: Response) => {
  const { success, data, error } = paginationType
    .and(z.object({ language: z.string() }))
    .safeParse(req.query);
  const userId = req.user.userId;
  if (!success) {
    res.status(200).json({
      message: formatValidationError(error)
    });
    return;
  }
  const response = await trendingAlbum(data.language, userId)

  const album = pagination(response, data.limit, data.page);
  console.log(album)
  res.status(200).json(album)

};
