import { NextFunction, Request, Response } from "express";
import { songByArtist } from "../../service/songs/songByArtist.js";
import { apiError } from "@utils/apiError.js";




export const getTopSongByArtist = async (req: Request, res: Response, next: NextFunction) => {
    const { artistId } = req.params;
    const userId = req.user.userId;
    if (!artistId || typeof artistId !== "string") {

        return next(new apiError(401, "Invalid input", {
            message: "Invalid input"
        }))
    }


    const songs = await songByArtist(userId, artistId);
    res.status(200).json(songs);



}