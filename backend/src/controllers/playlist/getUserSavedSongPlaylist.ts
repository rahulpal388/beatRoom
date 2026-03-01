import { NextFunction, Request, Response } from "express";
import { retriveUserSongPlaylist } from "../../service/playlist/retriveUserSongPlaylist.js";
import { apiError } from "../../utils/apiError.js";
import { formatValidationError } from "../../utils/formatZodValidationError.js";

export const getUserSavedSongPlaylist = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user
    const { id } = req.params

    if (!userId) {
        return next(new apiError(401, "Unauthorize to get user playlist song", {
            message: "Login to get user playlist song"
        }))
    }

    if (!id || typeof id !== "string") {
        return next(new apiError(401, "Invalid input", {
            message: "Invali Input"
        }))
    }
    try {

        const playlistSong = await retriveUserSongPlaylist(userId, id);
        if (!playlistSong) {
            throw new Error("Error");
        }
        res.status(200).json(playlistSong)

    } catch {


        return next(new apiError(500, "Error getting user save playlist song", {
            message: "Server Error"
        }))
    }

}
