import { paginationType } from "../../zodTypes/paginatipType.js";
import axios from "axios";
import { Request, Response } from "express";
import { retrivePlaylist } from "../../utils/retrivePlaylist.js";
import { getLikedPlaylist } from "../../service/playlist/getLikedPlaylist.js";
import { ApiPlaylist } from "../../types/playlistType.js";



const getTopPlaylist = async (req: Request, res: Response) => {
  const { success, data } = paginationType.safeParse(req.query);
  const userId = req.user.userId;
  if (!success) {
    return res.status(401).json({
      message: "Invalid input"
    });

  }

  try {
    const [response, likedPlaylist] = await Promise.all([
      axios.get(
        `https://www.jiosaavn.com/api.php?__call=content.getFeaturedPlaylists&fetch_from_serialized_files=true&p=${data.page}&n=${data.limit}&api_version=4&_format=json&_marker=0&ctx=web6dot0`
      ),
      getLikedPlaylist(userId),
    ]);

    const playlist = response.data.data as ApiPlaylist[];
    const result = retrivePlaylist(playlist, likedPlaylist);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while finding the top playlist"
    });
  }
};

export default getTopPlaylist;
