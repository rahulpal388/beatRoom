import { ISong } from "../../controllers/song/getTendingSong.js";
import { retriveArtistAlbum } from "../../utils/retriveArtistAlbum.js";
import { retriveArtistPlaylist } from "../../utils/retriveArtistPlaylist.js";
import { retriveSong } from "../../utils/retriveSong.js";
import axios from "axios";
import { Request, Response } from "express";
import z from "zod";

export type IArtistPlaylist = {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  image: string;
  perma_url: string;
  more_info: {
    entity_type: string;
    song_count: string;
    language: string;
  };
};

export type IArtistAlbum = {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  perma_url: string;
  image: string;
  language: string;
  more_info: {
    artistMap: {
      artists: {
        id: string;
        name: string;
        role: string;
        image: string;
        type: string;
        perma_url: string;
      }[];
    };
  };
};

type IArtistInfo = {
  artistId: string;
  name: string;
  subtitle: string;
  image: string;
  follower_count: string;
  type: string;
  topSongs: ISong[];
  topAlbums: IArtistAlbum[];
  dedicated_artist_playlist: IArtistPlaylist[];
  featured_artist_playlist: IArtistPlaylist[];
  latest_release: IArtistAlbum[];
};

export const getArtistInfo = async (req: Request, res: Response) => {
  const { success, data } = z
    .object({ artistToken: z.string() })
    .safeParse(req.query);

  if (!success) {
    res.status(200).json({});
    return;
  }

  try {
    const response = (
      await axios.get(
        `https://www.jiosaavn.com/api.php?__call=webapi.get&token=${data.artistToken}&type=artist&p=0&n_song=50&n_album=50&sub_type=&category=&sort_order=&includeMetaTags=0&ctx=web6dot0&api_version=4&_format=json&_marker=0`
      )
    ).data as IArtistInfo;
    retriveArtistAlbum(response.topAlbums);
    const result: IArtistInfo = {
      artistId: response.artistId,
      name: response.name,
      subtitle: response.subtitle,
      image: response.image.replace("150x150", "500x500"),
      follower_count: response.follower_count,
      type: response.type,
      topSongs: retriveSong(response.topSongs, false),
      topAlbums: retriveArtistAlbum(response.topAlbums),
      latest_release: retriveArtistAlbum(response.latest_release),
      dedicated_artist_playlist: retriveArtistPlaylist(
        response.dedicated_artist_playlist
      ),
      featured_artist_playlist: retriveArtistPlaylist(
        response.featured_artist_playlist
      ),
    };

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(200).json({});
  }
};
