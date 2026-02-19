import { retrivePlaylist } from "../../utils/retrivePlaylist.js";
import { paginationType } from "../../zodTypes/paginatipType.js";
import axios from "axios";
import { Request, Response } from "express";
import z from "zod";
import { ApiPlaylist } from "../../types/playlistType.js";
import { getLikedPlaylist } from "../../service/playlist/getLikedPlaylist.js";



export const getTrendingPlaylist = async (req: Request, res: Response) => {
  const { success, data } = paginationType
    .and(z.object({ language: z.string() }))
    .safeParse(req.query);
  const userId = req.user.userId;
  if (!success) {
    res.status(400).json({
      message: "Invalid input"
    });
    return;
  }

  try {
    const [response, likedPlaylist] = await Promise.all([
      await axios.get(
        `https://www.jiosaavn.com/api.php?__call=content.getTrending&api_version=4&_format=json&_marker=0&ctx=web6dot0&entity_type=playlist&entity_language=${data.language}`
      ),
      getLikedPlaylist(userId),
    ]);

    const playlist = response.data.slice(
      Number(data.page) * Number(data.limit),
      Number(data.limit) * (Number(data.page) + 1)
    ) as ApiPlaylist[];

    const result = retrivePlaylist(playlist, likedPlaylist);

    res.status(200).json(result);
  } catch {
    res.status(500).json({
      message: "Error finding trending playlist"
    });
  }
};





