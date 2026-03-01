import { pagination } from "../../utils/pagination.js";
import { paginationType } from "../../zodTypes/paginatipType.js";
import { NextFunction, Request, Response } from "express";
import { trendingAlbum } from "../../service/album/trendingAlbum.js";
import z from "zod";
import { formatValidationError } from "../../utils/formatZodValidationError.js";
import { apiError } from "../../utils/apiError.js";

export const getTrendingAlbum = async (req: Request, res: Response, next: NextFunction) => {
  const { success, data, error } = paginationType
    .and(z.object({ language: z.string() }))
    .safeParse(req.query);
  const userId = req.user.userId;
  if (!success) {
    return next(new apiError(401, "Invalid input", {
      message: formatValidationError(error)
    }))
  }
  const response = await trendingAlbum(data.language, userId)

  const album = pagination(response, data.limit, data.page);
  res.status(200).json(album)

};
