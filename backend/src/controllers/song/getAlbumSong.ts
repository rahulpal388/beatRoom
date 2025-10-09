import httpAgentAndTimeOut from "../../utils/httpAgent";
import axios from "axios";
import { Request, Response } from "express";
import z from "zod";


type IAlbumSongs = {
    id: string,
    name: string,
    type: string,
    language: string,
    artists: {
        primary: {
            id: string,
            name: string,
            role: string,
            image: {
                quality: string,
                url: string
            }[]
            ,
            type: string,
            url: string
        }
    },
    image: {
        quality: string,
        url: string
    }[],
    songs: {
        id: string,
        name: string,
        type: string,
        duration: number,
        language: string,
        album: {
            id: string,
            name: string,
        },
        artists: {
            primary: {
                id: string,
                name: string,
                role: string,
                image: {
                    quality: string,
                    url: string
                }[]
                ,
                type: string,
                url: string
            }
        },
        image: {
            quality: string,
            url: string
        }[]
    }[]
}




const getAlbumSong = async (req: Request, res: Response) => {

    const { success, data } = z.object({ id: z.string() }).safeParse(req.params);


    if (!success) {
        return res.status(200).json({
            messsage: "invalid url"
        })
    }

    try {



        const response = await axios.get(`https://saavn.dev/api/albums?id=${data.id}`, { ...httpAgentAndTimeOut });


        const songs = response.data.data as IAlbumSongs;
        const result: IAlbumSongs = {
            id: songs.id,
            name: songs.name,
            type: songs.type,
            language: songs.language,
            artists: {
                primary: songs.artists.primary
            },
            image: songs.image,
            songs: songs.songs.map(x => {
                return {
                    id: x.id,
                    name: x.name,
                    type: x.type,
                    duration: x.duration,
                    language: x.language,
                    album: {
                        id: x.album.id,
                        name: x.album.name
                    },
                    artists: {
                        primary: x.artists.primary
                    },
                    image: x.image
                }
            })

        }
        res.status(200).json({ ...result })


    } catch (error) {

        res.status(200).json({})

    }

}



export default getAlbumSong;