import axios from "axios";
import { paginationType } from "../../zodTypes/paginatipType.js";
import { Request, Response } from "express";

type ITopArtist = {
  artistid: string;
  name: string;
  image: string;
  perma_url: string;
};

export type IArtists = {
  id: string;
  name: string;
  role: string;
  image: string;
  type: string;
  perma_url: string;
};

const getTopArtits = async (req: Request, res: Response) => {
  const { success, data } = paginationType
    .omit({ page: true })
    .safeParse(req.query);

  if (!success) {
    res.status(200).json([]);
    return;
  }

  try {
    const response = (
      await axios.get(
        `https://www.jiosaavn.com/api.php?__call=social.getTopArtists&api_version=4&_format=json&_marker=0&ctx=web6dot0`
      )
    ).data;

    const topArtists = response.top_artists as ITopArtist[];

    const result: ITopArtist[] = topArtists
      .slice(0, Number(data.limit))
      .map((items) => {
        return {
          artistid: items.artistid,
          name: items.name,
          image: items.image.replace("150x150", "500x500"),
          perma_url: items.perma_url,
        };
      });

    res.status(200).json(result);
  } catch (error) {
    res.status(200).json([]);
  }
};

export default getTopArtits;
