import { paginationType } from "../../zodTypes/paginatipType.js";
import axios from "axios";
import { Request, Response } from "express";
import z from "zod";

export type IPlaylist = {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  perma_url: string;
  image: string;
};

export type IPlaylistResponse = {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  image: string;
  perma_url: string;
  isLiked?: boolean;
  more_info: {
    entity_type: string;
    song_count: string;
    language: string;
  };
};

export const getTrendingPlaylist = async (req: Request, res: Response) => {
  const { success, data } = paginationType
    .and(z.object({ language: z.string() }))
    .safeParse(req.query);

  if (!success) {
    res.status(400).json([]);
    return;
  }

  try {
    const response = (
      await axios.get(
        `https://www.jiosaavn.com/api.php?__call=content.getTrending&api_version=4&_format=json&_marker=0&ctx=web6dot0&entity_type=playlist&entity_language=${data.language}`
      )
    ).data as IPlaylist[];

    const result: IPlaylistResponse[] = response
      .slice(
        Number(data.page) * Number(data.limit),
        Number(data.limit) * (Number(data.page) + 1)
      )
      .map((x) => {
        return {
          id: x.id,
          title: x.title,
          subtitle: x.subtitle,
          perma_url: x.perma_url,
          image: x.image,
          type: x.type,
          isLiked: false,
          more_info: {
            song_count: "",
            entity_type: "",
            language: "",
          },
        };
      });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json([]);
  }
};
