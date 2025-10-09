import axios from "axios";
import { Request, Response } from "express";
import z from "zod";


type IAlbumSongs = {
    id: string,
    title: string,
    type: string,
    language: string,
    list: {
        id: string,
        title: string,
        image: string,
        type: string,
        language: string,
        more_info: {
            album_id: string,
            album: string,
            duration: string,
            album_url: string,
            artistMap: {
                primary_artists: {
                    id: string,
                    name: string,
                    type: string
                }[]
            }
        }
    }[]
}




const getAlbumSong = async (req: Request, res: Response) => {

    const { success, data } = z.object({ token: z.string() }).safeParse(req.query);

    if (!success) {
        return res.status(200).json({
            messsage: "invalid url"
        })
    }

    try {

        const response = await axios.get(`https://www.jiosaavn.com/api.php?__call=webapi.get&api_version=4&_format=json&_marker=0&token=${data.token}&type=album`);

        const songs = response.data as IAlbumSongs;

        const result: IAlbumSongs = {
            id: songs.id,
            title: songs.title,
            type: songs.type,
            language: songs.language,
            list: songs.list.map(x => {
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
                        album_url: x.more_info.album_url,
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
        }


        res.status(200).json({ ...result })


    } catch (error) {
        console.log(error)
        res.status(200).json({})

    }

}



export default getAlbumSong;