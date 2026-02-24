import { Request, Response } from "express";
import { songByArtist } from "service/songs/songByArtist.js";




export const getTopSongByArtist = async (req: Request, res: Response) => {
    const { artistId } = req.params;
    const userId = req.user.userId;
    console.log(artistId)
    if (!artistId || typeof artistId !== "string") {

        return res.status(401).json({
            message: "Invalid input"
        })
    }


    const songs = await songByArtist(userId, artistId);
    console.log(songs)
    res.status(200).json(songs);



}