import axios from "axios";
import { Request, Response } from "express";
import { paginationType } from "../../zodTypes/paginatipType";
import z from "zod";


export type ISong = {
    id: string,
    title: string,
    subtitle: string,
    type: string,
    perm_url: string,
    image: string,
    language: string,
    more_info: {
        album_id: string,
        album: string,
        album_url: string,
        duration: string,
        artistMap: {
            artists: {
                id: string,
                name: string,
                image: string,
                perm_url: string,
                role: string,
                type: string
            }[]
        },
        released_date: string
    }
}




const getTrendingSong = async (req: Request, res: Response) => {


    const { success, data } = paginationType.and(z.object({ language: z.string() })).safeParse(req.query);

    if (!success) {
        res.status(200).json([]);
        return;
    }

    try {

        const response = await axios.get(`https://www.jiosaavn.com/api.php?__call=content.getTrending&api_version=4&_format=json&_marker=0&ctx=web6dot0&entity_type=song&entity_language=${data.language}`);
        const trending = response.data as ISong[];
        const sliceTrending = trending.slice(Number(data.page) * Number(data.limit), (Number(data.page) + 1) * Number(data.limit));
        const result: ISong[] = sliceTrending.map(item => {
            return {
                id: item.id,
                title: item.title,
                subtitle: item.subtitle,
                type: item.type,
                perm_url: item.perm_url,
                image: item.image,
                language: item.language,
                more_info: {
                    album_id: item.more_info.album_id,
                    album: item.more_info.album,
                    album_url: item.more_info.album_url,
                    duration: item.more_info.duration,
                    artistMap: {
                        artists: item.more_info.artistMap.artists.map(x => {
                            return {
                                id: x.id,
                                name: x.name,
                                image: x.image,
                                perm_url: x.perm_url,
                                role: x.role,
                                type: x.type
                            }
                        })
                    },
                    released_date: item.more_info.released_date
                }

            }
        })

        res.status(200).json(result);

    } catch (error) {
        res.status(200).json([]);

    }


}



export default getTrendingSong;