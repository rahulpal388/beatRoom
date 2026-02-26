import { Request, Response } from "express";
import { songByArtist } from "../../service/songs/songByArtist.js";




export const getTopSongByArtist = async (req: Request, res: Response) => {
    const { artistId } = req.params;
    const userId = req.user.userId;
    if (!artistId || typeof artistId !== "string") {

        return res.status(401).json({
            message: "Invalid input"
        })
    }


    const songs = await songByArtist(userId, artistId);
    res.status(200).json(songs);



}