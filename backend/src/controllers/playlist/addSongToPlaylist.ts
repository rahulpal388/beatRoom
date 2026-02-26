import { formatValidationError } from "../../utils/formatZodValidationError.js";
import { addSongToPlaylistType } from "../../zodTypes/playlist.js";
import { Request, Response } from "express";
import { saveSongToPlaylist } from "../../service/playlist/saveSongToPlaylist.js";
import { ISong } from "../../types/songType.js";




export const addSongToPlaylist = async (req: Request, res: Response) => {

    const { success, data, error } = addSongToPlaylistType.safeParse(req.body);
    const { userId } = req.user
    if (!userId) {
        return res.status(401).json({
            message: "log in to add song to playlist"
        })
    }

    if (!success) {
        return res.status(400).json({
            message: formatValidationError(error)
        })
    }


    const isSaved = await saveSongToPlaylist(userId, data.id, data.songs as ISong)

    if (!isSaved) {
        return res.status(500).json({
            message: "Error adding song to playlist"
        })
    }

    res.status(200).json({
        message: "song added to playlist"
    })

}