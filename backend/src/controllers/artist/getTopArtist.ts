import { paginationType } from "../../zodTypes/paginatipType.js";
import { Request, Response } from "express";
import { getTopArtists } from "../../service/artists/getTopArtists.js";
import { pagination } from "../../utils/pagination.js";




const getTopArtits = async (req: Request, res: Response) => {
  const { success, data } = paginationType
    .safeParse(req.query);

  if (!success) {
    return res.status(401).json({
      messsage: "Invalid input"
    });

  }

  const response = await getTopArtists();
  const topArtist = pagination(response, data.limit, data.page);
  res.status(200).json(topArtist)

};

export default getTopArtits;
