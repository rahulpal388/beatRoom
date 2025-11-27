import axios from "axios";
import { Request, Response } from "express";
import { paginationType } from "../../zodTypes/paginatipType";
import z from "zod";
import { retriveSong } from "../../utils/retriveSong";

export type ISong = {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  perma_url: string;
  image: string;
  language: string;
  more_info: {
    album_id: string;
    album: string;
    album_url: string;
    duration: string;
    encrypted_media_url: string;
    artistMap: {
      artists: {
        id: string;
        name: string;
        image: string;
        perma_url: string;
        role: string;
        type: string;
      }[];
    };
    release_date: string;
  };
};

const getTrendingSong = async (req: Request, res: Response) => {
  const { success, data } = paginationType
    .and(z.object({ language: z.string() }))
    .safeParse(req.query);

  if (!success) {
    res.status(200).json([]);
    return;
  }

  try {
    const response = await axios.get(
      `https://www.jiosaavn.com/api.php?__call=content.getTrending&api_version=4&_format=json&_marker=0&ctx=web6dot0&entity_type=song&entity_language=${data.language}`
    );
    const trending = response.data as ISong[];
    const sliceTrending = trending.slice(
      Number(data.page) * Number(data.limit),
      (Number(data.page) + 1) * Number(data.limit)
    );
    const result = retriveSong(sliceTrending);

    res.status(200).json(result);
  } catch (error) {
    res.status(200).json([]);
  }
};

export default getTrendingSong;
