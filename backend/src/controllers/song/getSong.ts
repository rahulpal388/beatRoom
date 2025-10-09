import httpAgentAndTimeOut from "../../utils/httpAgent";
import axios from "axios";
import { Request, Response } from "express";
import z from "zod";


type ISong = {
    id: string,
    name: string,
    type: string,
    duration: number,
    language: string,
    album: {
        id: string,
        name: string,
        url: string
    },
    artists: {
        primary: {
            id: string,
            name: string,
            image: {
                quality: string,
                url: string
            }[],
            url: string,
            type: string
        }[]
    },
    image: {
        quality: string,
        url: string
    }[]
}


const getSong = async (req: Request, res: Response) => {

    const { success, data } = z.object({ id: z.string() }).safeParse(req.params);

    if (!success) {
        return res.status(200).json({
            message: "invalid url"
        })
    }

    try {

        const response = await axios.get(`https://saavn.dev/api/songs/${data.id}`, { ...httpAgentAndTimeOut });

        const songs = response.data.data[0] as ISong;

        const result: ISong = {
            id: songs.id,
            name: songs.name,
            type: songs.type,
            duration: songs.duration,
            language: songs.language,
            album: {
                id: songs.album.id,
                name: songs.album.name,
                url: songs.album.url
            },
            artists: {
                primary: songs.artists.primary.map(x => {
                    return {
                        id: x.id,
                        name: x.name,
                        image: x.image,
                        url: x.url,
                        type: x.type
                    }
                })
            },
            image: songs.image
        }


        res.status(200).json({ ...result });


    } catch (error) {
        console.log(error)
        res.status(200).json({})
    }

};




export default getSong;