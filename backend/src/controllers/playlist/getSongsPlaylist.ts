import { retriveSong } from "../../utils/retriveSong";
import { IArtists } from "../../controllers/artist/getTopArtist";
import { ISong } from "../../controllers/song/getTendingSong";
import axios from "axios";
import { Request, Response } from "express";

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

  try {
    const response = (
      await axios.get(
        `https://www.jiosaavn.com/api.php?__call=webapi.get&api_version=4&_format=json&_marker=0&ctx=web6dot0&token=${token}&type=playlist`
      )
    ).data as ISongsPlaylist;
    const result: ISongsPlaylist = {
      id: response.id,
      title: response.title,
      subtitle: response.subtitle,
      type: response.type,
      image: response.image,
      language: response.list[0].language,
      perma_url: response.perma_url,
      list_count: response.list_count,
      list: retriveSong(response.list),
      more_info: {
        artists: response.more_info.artists.map((x) => {
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
