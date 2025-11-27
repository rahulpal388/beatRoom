import axios from "axios";
import { Request, Response } from "express";
import z from "zod";
import { ISong } from "./getTendingSong";
import { paginationType } from "../../zodTypes/paginatipType";

// album_id: item.more_info.album_id,
//     album: item.more_info.album,
//         album_url: item.more_info.album_url,\

type IAlbum = {
  id: string;
  title: string;
  type: string;
  perma_url: string;
  image: string;
};

type IMoreInfo = Omit<
  ISong["more_info"],
  "album_id" | "album" | "album_url" | "encrypted_media_url"
> &
  Partial<
    Pick<
      ISong["more_info"],
      "album_id" | "album" | "album_url" | "encrypted_media_url"
    >
  >;

type INewRelease = Omit<ISong, "more_info"> & { more_info: IMoreInfo };

const getNewReleasedSong = async (req: Request, res: Response) => {
  const { success, data } = paginationType.safeParse(req.query);
  console.log("request come");
  if (!success) {
    res.status(200).json([]);
    return;
  }

  try {
    console.log("getting data");
    const response = (
      await axios.get(
        `https://www.jiosaavn.com/api.php?__call=content.getAlbums&api_version=4&_format=json&_marker=0&n=${data.limit}&p=${data.page}&ctx=web6dot0`
      )
    ).data;
    console.log(response);
    const newSong = response.data as INewRelease[];
    const result: INewRelease[] = newSong.map((items) => {
      return {
        id: items.id,
        title: items.title,
        subtitle: items.subtitle,
        type: items.type,
        perma_url: items.perma_url,
        image: items.image.replace("150x150", "500x500"),
        language: items.language,
        more_info: {
          album_id: items.more_info.album_id,
          album: items.more_info.album,
          album_url: items.more_info.album_url,
          duration: items.more_info.duration,
          encrypted_media_url: items.more_info.encrypted_media_url,
          artistMap: {
            artists: items.more_info.artistMap.artists.map((artist) => {
              return {
                id: artist.id,
                name: artist.name,
                image: artist.image,
                perma_url: artist.perma_url,
                role: artist.role,
                type: artist.type,
              };
            }),
          },
          release_date: items.more_info.release_date,
        },
      };
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(200).json([]);
  }
};

export default getNewReleasedSong;
