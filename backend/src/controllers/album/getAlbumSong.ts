import z from "zod";
import { retriveSong } from "../../utils/retriveSong.js";
import { ISong } from "../song/getTendingSong.js";
import axios from "axios";
import { Request, Response } from "express";
import { TimeoutError } from "puppeteer";
import { getLikedSong } from "../../utils/getlikedSong.js";

export type ISongAlbum = {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  perma_url: string;
  image: string;
  language: string;
  list_count: string;
  isLiked: boolean;
  list: ISong[];
  more_info: {
    artistMap: {
      primary_artists: {
        id: string;
        name: string;
        image: string;
        type: string;
        perma_url: string;
      }[];
    };
  };
};

export const getSongAlbum = async (req: Request, res: Response) => {
  const { success, data } = z
    .object({
      songToken: z.string().optional(),
      albumToken: z.string().optional(),
    })
    .safeParse(req.query);
  const userId = req.user.userId;

  if (!success) {
    res.status(200).json([]);
    return;
  }

  try {
    const [response, likedSong] = await Promise.all([
      axios.get(
        `https://www.jiosaavn.com/api.php?__call=webapi.get&api_version=4&_format=json&_marker=0&ctx=web6dot0&token=${data.albumToken}}&type=album`
      ),
      getLikedSong(userId),
    ]);
    let result: ISongAlbum | {} = {};
    const album = response.data as ISongAlbum;
    if (album.id === "dsf7m88e" || album.id === "") {
      const responseSong = (
        await axios.get(
          `https://www.jiosaavn.com/api.php?__call=webapi.get&api_version=4&_format=json&_marker=0&ctx=web6dot0&token=${data.songToken}&type=song`
        )
      ).data.songs[0] as ISong;

      result = {
        id: responseSong.more_info.album_id,
        title: responseSong.more_info.album,
        subtitle: "",
        type: "album",
        perma_url: responseSong.more_info.album_url,
        image: "",
        language: responseSong.language,
        list_count: "1",
        isLiked: false,
        list: retriveSong([responseSong], likedSong),
        more_info: {
          artistMap: {
            primary_artists: responseSong.more_info.artistMap.artists.map(
              (x) => {
                return {
                  id: x.id,
                  name: x.name,
                  type: x.type,
                  perma_url: x.perma_url,
                  image: x.image.replace("150x150", "500x500"),
                };
              }
            ),
          },
        },
      };
    } else {
      result = {
        id: album.id,
        title: album.title,
        subtitle: album.subtitle,
        type: album.type,
        perma_url: album.perma_url,
        image: album.image.replace("150x150", "500x500"),
        language: album.language,
        list_count: album.list_count,
        isLiked: false,
        list: retriveSong(album.list, likedSong),
        more_info: {
          artistMap: {
            primary_artists: album.more_info.artistMap.primary_artists.map(
              (x) => {
                return {
                  id: x.id,
                  name: x.name,
                  type: x.type,
                  perma_url: x.perma_url,
                  image: x.image.replace("150x150", "500x500"),
                };
              }
            ),
          },
        },
      };
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json([]);
  }
};
