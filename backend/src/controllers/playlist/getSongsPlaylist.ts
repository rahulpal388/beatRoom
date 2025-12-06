import { retriveSong } from "../../utils/retriveSong.js";
import { IArtists } from "../../controllers/artist/getTopArtist.js";
import { ISong } from "../../controllers/song/getTendingSong.js";
import axios from "axios";
import { Request, Response } from "express";
import { getLikedSong } from "../../utils/getlikedSong.js";
import { getLikedPlaylist } from "../../utils/getLikedPlaylist.js";

type ISongsPlaylist = {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  perma_url: string;
  image: string;
  language: string;
  list_count: string;
  list: ISong[];
  more_info: {
    artists: IArtists[];
  };
};

export const getSongsPlaylist = async (req: Request, res: Response) => {
  const { token } = req.params;
  const userId = req.user.userId;

  try {
    const [response, likedSong, likedPlaylist] = await Promise.all([
      axios.get(
        `https://www.jiosaavn.com/api.php?__call=webapi.get&api_version=4&_format=json&_marker=0&ctx=web6dot0&token=${token}&type=playlist`
      ),
      getLikedSong(userId),
      getLikedPlaylist(userId),
    ]);
    const playlist = response.data as ISongsPlaylist;
    const result = {
      id: playlist.id,
      title: playlist.title,
      subtitle: playlist.subtitle,
      type: playlist.type,
      image: playlist.image,
      language: playlist.list[0].language,
      perma_url: playlist.perma_url,
      list_count: playlist.list_count,
      isLiked: likedPlaylist.has(playlist.id),
      list: retriveSong(playlist.list, likedSong),
      more_info: {
        artists: playlist.more_info.artists.map((x) => {
          return {
            id: x.id,
            name: x.name,
            type: x.type,
            role: x.role,
            perma_url: x.perma_url,
            image: x.image,
          };
        }),
      },
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(200).json([]);
  }
};
