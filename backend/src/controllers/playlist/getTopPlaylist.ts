import { paginationType } from "../../zodTypes/paginatipType";
import axios from "axios";
import { Request, Response } from "express";


interface IPlaylist {
    id: string,
    title: string,
    subtitle: string,
    type: string,
    image: string,
    perma_url: string,
    more_info: {
        song_count: string
    }
}


const getTopPlaylist = async (req: Request, res: Response) => {

    const { success, data } = paginationType.safeParse(req.query);

    if (!success) {
        res.status(200).json([]);
        return;
    }

    try {

        const response = (await axios.get(`https://www.jiosaavn.com/api.php?__call=content.getFeaturedPlaylists&fetch_from_serialized_files=true&p=${data.page}&n=${data.limit}&api_version=4&_format=json&_marker=0&ctx=web6dot0`)).data;

        const playlist = response.data as IPlaylist[];

        const result: IPlaylist[] = playlist.map(items => {
            return {
                id: items.id,
                title: items.title,
                subtitle: items.subtitle,
                type: items.type,
                image: items.image,
                perma_url: items.perma_url,
                more_info: {
                    song_count: items.more_info.song_count
                }
            }
        })

        res.status(200).json(result);

    } catch (error) {
        res.status(200).json([]);
    }


}


export default getTopPlaylist;