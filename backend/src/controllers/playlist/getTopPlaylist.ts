import { paginationType } from "../../zodTypes/paginatipType.js";
import axios from "axios";
import { Request, Response } from "express";
import { IPlaylist, IPlaylistResponse } from "./getTrendingPlaylist.js";
import { retrivePlaylist } from "../../utils/retrivePlaylist.js";
import { getLikedPlaylist } from "../../utils/getLikedPlaylist.js";

// interface IPlaylist {
//   id: string;
//   title: string;
//   subtitle: string;
//   type: string;
//   image: string;
//   perma_url: string;
// }

const getTopPlaylist = async (req: Request, res: Response) => {
  const { success, data } = paginationType.safeParse(req.query);
  const userId = req.user.userId;
  if (!success) {
    res.status(200).json([]);
    return;
  }
  console.log(req.params);
  console.log(userId.length);
  try {
    const [response, likedPlaylist] = await Promise.all([
      axios.get(
        `https://www.jiosaavn.com/api.php?__call=content.getFeaturedPlaylists&fetch_from_serialized_files=true&p=${data.page}&n=${data.limit}&api_version=4&_format=json&_marker=0&ctx=web6dot0`
      ),
      getLikedPlaylist(userId),
    ]);

    const playlist = response.data.data as IPlaylist[];

    const result = retrivePlaylist(playlist, likedPlaylist);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(200).json([]);
  }
};

export default getTopPlaylist;
