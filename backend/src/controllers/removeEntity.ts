import { formatValidationError } from "../utils/formatZodValidationError.js";
import { NextFunction, Request, Response } from "express";
import { removeUserAlbum } from "../service/album/removeUserAlbum.js";
import { removeLikedArtist } from "../service/artists/removeLikedArtist.js";
import { removeLikedPlaylist } from "../service/playlist/removeLikedPlaylist.js";
import { removeUserSong } from "../service/songs/removeUserSong.js";
import z from "zod";
import { apiError } from "@utils/apiError.js";



export const removeEntity = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;
    const { success, data, error } = z.object({ id: z.string(), type: z.string() }).safeParse(req.body);
    if (!userId) {
        return next(new apiError(401, "Unauthorize to remove entity", {
            message: "Login to remove songs"
        }))
    }

    if (!success) {
        return next(new apiError(401, "Invalid input save album", {
            message: formatValidationError(error)
        }))

    }

    try {
        switch (data.type) {
            case "playlist": {
                await removeLikedPlaylist(userId, data.id, data.type);
                break;
            }
            case "userPlaylist": {
                await removeLikedPlaylist(userId, data.id, data.type);
                break;
            }
            case "song": {
                await removeUserSong(userId, data.id)
                break;
            }
            case "album": {
                await removeUserAlbum(userId, data.id);
                break;
            }
            case "artist": {
                await removeLikedArtist(userId, data.id)
                break;
            }
        }
        // remove depending on the id and type
        res.status(200).json({
            messae: "items removed"
        })
    } catch (error) {
        return next(new apiError(500, "Error removing entity", {
            message: "Server Error"
        }))

    }

};
