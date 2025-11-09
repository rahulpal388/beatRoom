import axios from "axios";
import { Request, Response } from "express";
import z from "zod";
import { ISong } from "./getTendingSong";
import { paginationType } from "../../zodTypes/paginatipType";


// album_id: item.more_info.album_id,
//     album: item.more_info.album,
//         album_url: item.more_info.album_url,

type IMoreInfo = Omit<ISong["more_info"], "album_id" | "album" | "album_url"> & Partial<Pick<ISong["more_info"], "album_id" | "album" | "album_url">>

type INewRelease = Omit<ISong, "more_info"> & { more_info: IMoreInfo };

const getNewReleasedSong = async (req: Request, res: Response) => {

    const { success, data } = paginationType.safeParse(req.query);

    if (!success) {
        res.status(200).json([])
        return
    }

    try {

        const response = (await axios.get(`https://www.jiosaavn.com/api.php?__call=content.getAlbums&api_version=4&_format=json&_marker=0&n=${data.limit}&p=${data.page}&ctx=web6dot0`)).data;

        const newSong = response.data as INewRelease[];

        const result: INewRelease[] = newSong.map(items => {
            return {
                id: items.id,
                title: items.title,
                subtitle: items.subtitle,
                type: items.type,
                perm_url: items.perm_url,
                image: items.image,
                language: items.language,
                more_info: {
                    album_id: items.more_info.album_id,
                    album: items.more_info.album,
                    album_url: items.more_info.album_url,
                    duration: items.more_info.duration,
                    artistMap: {
                        artists: items.more_info.artistMap.artists.map(artist => {
                            return {
                                id: artist.id,
                                name: artist.name,
                                image: artist.image,
                                perm_url: artist.perm_url,
                                role: artist.role,
                                type: artist.type
                            }
                        })
                    },
                    released_date: items.more_info.released_date
                }
            }

        })

        res.status(200).json(result)

    } catch (error) {
        res.status(200).json([]);
    }

}


export default getNewReleasedSong;