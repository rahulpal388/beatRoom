import axios from "axios";
import { Request, Response } from "express";
import { IPlaylist, IPlaylistResponse } from "./getTrendingPlaylist.js";
import { paginationType } from "../../zodTypes/paginatipType.js";
import z from "zod";
import { getLikedPlaylist } from "../../utils/getLikedPlaylist.js";
import { retrivePlaylist } from "../../utils/retrivePlaylist.js";

export const getPlaylistReco = async (req: Request, res: Response) => {
  const { success, data } = paginationType
    .and(z.object({ listid: z.string() }))
    .safeParse(req.query);
  const userId = req.user.userId;
  if (!success) {
    res.status(200).json([]);
    return;
  }
  try {
    const [response, likedPlaylist] = await Promise.all([
      axios.get(
        `https://www.jiosaavn.com/api.php?__call=reco.getPlaylistReco&api_version=4&_format=json&_marker=0&ctx=web6dot0&listid=${data.listid}`
      ),
      getLikedPlaylist(userId),
    ]);

    const playlist = response.data.slice(
      Number(data.page) * Number(data.limit),
      (Number(data.page) + 1) * Number(data.limit)
    ) as IPlaylist[];

    const result = retrivePlaylist(playlist, likedPlaylist);

    res.status(200).json(result);
  } catch (error) {
    res.status(200).json([]);
  }
};
