import httpAgentAndTimeOut from "../../utils/httpAgent";
import axios from "axios";
import { Request, Response } from "express";
import z from "zod";


type ITrendingSong = {
    id: string,
    title: string,
    type: string,
    image: string,
    language: string,
    more_info: {
        album_id: string,
        album: string,
        duration: string,
        artistMap: {
            primary_artists: {
                id: string,
                name: string,
                type: string
            }[]
        }
    }
}



const getTrendingSong = async (req: Request, res: Response) => {


    const { success, data } = z.object({ language: z.string(), page: z.string(), limit: z.string() }).safeParse(req.params);
    console.log(data?.language)
    if (!success) {
        return res.status(200).json({
            message: "invalid url"
        })
    }
    try {
        const page = Number(data.page);
        const limit = Number(data.limit);

        const response = await axios.get(`https://www.jiosaavn.com/api.php?__call=content.getTrending&api_version=4&_format=json&_marker=0&ctx=web6dot0&entity_type=song&entity_language=bhojpuri`, { ...httpAgentAndTimeOut })

        const songList = response.data as ITrendingSong[];

        const result: ITrendingSong[] = songList.slice(page * limit, (page + 1) * limit).map(x => {
            return {
                id: x.id,
                title: x.title,
                type: x.type,
                image: x.image,
                language: x.language,
                more_info: {
                    album_id: x.more_info.album_id,
                    album: x.more_info.album,
                    duration: x.more_info.duration,
                    artistMap: {
                        primary_artists: x.more_info.artistMap.primary_artists.map(({ id, name, type }) => {
                            return {
                                id,
                                name,
                                type
                            }
                        })
                    }
                }
            }
        })


        res.status(200).json([...result]);


    } catch (error) {
        // console.log(error)
        res.status(200).json({})
    }

}



export default getTrendingSong;