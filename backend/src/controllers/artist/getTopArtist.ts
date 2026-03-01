import { paginationType } from "../../zodTypes/paginatipType.js";
import { NextFunction, Request, Response } from "express";
import { getTopArtists } from "../../service/artists/getTopArtists.js";
import { pagination } from "../../utils/pagination.js";
import { formatValidationError } from "@utils/formatZodValidationError.js";
import { apiError } from "@utils/apiError.js";




const getTopArtits = async (req: Request, res: Response, next: NextFunction) => {
  const { success, data, error } = paginationType
    .safeParse(req.query);

  if (!success) {
    return next(new apiError(401, "Invalid input save album", {
      message: formatValidationError(error)
    }))

  }

  const response = await getTopArtists();
  const topArtist = pagination(response, data.limit, data.page);
  res.status(200).json(topArtist)

};

export default getTopArtits;
