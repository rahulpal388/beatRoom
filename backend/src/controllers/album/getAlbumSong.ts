import z from "zod";
import { retriveSong } from "../../utils/retriveSong";
import { ISong } from "../song/getTendingSong";
import axios from "axios";
import { Request, Response } from "express";
import { TimeoutError } from "puppeteer";

type ISongAlbum = {
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

  if (!success) {
    res.status(200).json([]);
    return;
  }

  try {
    const response = (
      await axios.get(
        `https://www.jiosaavn.com/api.php?__call=webapi.get&api_version=4&_format=json&_marker=0&ctx=web6dot0&token=${data.albumToken}}&type=album`
      )
    ).data as ISongAlbum;
    let result: ISongAlbum | {} = {};

    if (response.id === "dsf7m88e" || response.id === "") {
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
        list: retriveSong([responseSong]),
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
        id: response.id,
        title: response.title,
        subtitle: response.subtitle,
        type: response.type,
        perma_url: response.perma_url,
        image: response.image.replace("150x150", "500x500"),
        language: response.language,
        list_count: response.list_count,
        list: retriveSong(response.list),
        more_info: {
          artistMap: {
            primary_artists: response.more_info.artistMap.primary_artists.map(
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
    res.status(200).json([]);
  }
};
