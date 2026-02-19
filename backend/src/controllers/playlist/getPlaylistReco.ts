import axios from "axios";
import { Request, Response } from "express";
import { paginationType } from "../../zodTypes/paginatipType.js";
import z from "zod";
import { retrivePlaylist } from "../../utils/retrivePlaylist.js";
import { getLikedPlaylist } from "../../service/playlist/getLikedPlaylist.js";
import { ApiPlaylist } from "../../types/playlistType.js";
import { pagination } from "../../utils/pagination.js";

export const getPlaylistReco = async (req: Request, res: Response) => {
  const { success, data } = paginationType
    .and(z.object({ listid: z.string() }))
    .safeParse(req.query);
  const userId = req.user.userId;
  if (!success) {
    res.status(401).json({
      message: "Invalid input"
    });
    return;
  }
  try {
    const [response, likedPlaylist] = await Promise.all([
      axios.get(
        `https://www.jiosaavn.com/api.php?__call=reco.getPlaylistReco&api_version=4&_format=json&_marker=0&ctx=web6dot0&listid=${data.listid}`
      ),
      getLikedPlaylist(userId),
    ]);

    const playlist = response.data as ApiPlaylist[];
    console.log(playlist)
    const result = retrivePlaylist(playlist, likedPlaylist);

    res.status(200).json(pagination(result, data.limit, data.page));
  } catch {
    res.status(500).json({
      message: "Error while get playlist recommandation"
    });
  }
};
