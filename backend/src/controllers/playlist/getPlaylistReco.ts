import axios from "axios";
import { Request, Response } from "express";
import { IPlaylist } from "./getTrendingPlaylist.js";
import { paginationType } from "../../zodTypes/paginatipType.js";
import z from "zod";

export const getPlaylistReco = async (req: Request, res: Response) => {
  const { success, data } = paginationType
    .and(z.object({ listid: z.string() }))
    .safeParse(req.query);

  if (!success) {
    res.status(200).json([]);
    return;
  }
  try {
    const response = (
      await axios.get(
        `https://www.jiosaavn.com/api.php?__call=reco.getPlaylistReco&api_version=4&_format=json&_marker=0&ctx=web6dot0&listid=${data.listid}`
      )
    ).data as IPlaylist[];

    const result: IPlaylist[] = response
      .slice(
        Number(data.page) * Number(data.limit),
        (Number(data.page) + 1) * Number(data.limit)
      )
      .map((x) => {
        return {
          id: x.id,
          title: x.title,
          subtitle: x.subtitle,
          type: x.type,
          perma_url: x.perma_url,
          image: x.image.replace("150x150", "500x500"),
        };
      });

    res.status(200).json(result);
  } catch (error) {
    res.status(200).json([]);
  }
};
