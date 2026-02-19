import { Request, Response } from "express";
import { retriveUserSongPlaylist } from "../../service/playlist/retriveUserSongPlaylist.js";

export const getUserSavedSongPlaylist = async (req: Request, res: Response) => {
    const { userId } = req.user
    const { id } = req.params

    if (!userId) {
        return res.status(401).json({
            message: "Login to get the save playlist song"
        })
    }

    if (!id || typeof id !== "string") {
        return res.status(401).json({
            message: "Invalid input"
        })
    }
    try {

        const playlistSong = await retriveUserSongPlaylist(userId, id);

        res.status(200).json(playlistSong ? playlistSong : {})

    } catch {
        res.status(500).json({
            message: "error getting save playlist song"
        })
    }

}
