import axios from "axios";
import { paginationType } from "../../zodTypes/paginatipType";
import { Request, Response } from "express";

type ITopArtist = {
  artistid: string;
  name: string;
  image: string;
  perma_url: string;
};

const getTopArtits = async (req: Request, res: Response) => {
  const { success, data } = paginationType.safeParse(req.query);

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

    const result: ITopArtist[] = topArtists.map((items) => {
      return {
        artistid: items.artistid,
        name: items.artistid,
        image: items.image,
        perma_url: items.perma_url,
      };
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(200).json([]);
  }
};

export default getTopArtits;
