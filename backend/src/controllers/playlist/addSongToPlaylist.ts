import { formatValidationError } from "../../utils/formatZodValidationError.js";
import { addSongToPlaylistType } from "../../zodTypes/playlist.js";
import { NextFunction, Request, Response } from "express";
import { saveSongToPlaylist } from "../../service/playlist/saveSongToPlaylist.js";
import { ISong } from "../../types/songType.js";
import { apiError } from "../../utils/apiError.js";




export const addSongToPlaylist = async (req: Request, res: Response, next: NextFunction) => {

    const { success, data, error } = addSongToPlaylistType.safeParse(req.body);
    const { userId } = req.user
    if (!userId) {
        return next(new apiError(401, "Unauthorize login to add song to playlist", {
            message: "Login to add song to playlist"
        }))
    }

    if (!success) {
        return next(new apiError(401, "Invalid input save album", {
            message: formatValidationError(error)
        }))
    }


    const isSaved = await saveSongToPlaylist(userId, data.id, data.songs as ISong)

    if (!isSaved) {
        return next(new apiError(500, "Error adding song to playlist", {
            message: "Server Error"
        }))
    }

    res.status(200).json({
        message: "song added to playlist"
    })

}